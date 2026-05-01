import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TableSortLabel, TablePagination, Paper, TextField, Skeleton, Chip,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Grid, InputAdornment, Tooltip, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, Search as SearchIcon, Close as CloseIcon, ReceiptLong, Payment as PaymentIcon, Cancel as CancelIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { BASE_URL, ImageURL } from '../../../constants';
import waterMark from './../../../assets/watermark_panel.svg';
import defaultImage from "../../../assets/contactsvg.svg";
import { useNavigate } from 'react-router-dom';

// Premium Table Styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    color: '#fbfcffff', // gray-600
    backgroundColor: 'rgb(35 67 118 / 0.9)', // lightly transparent gray-50
    borderBottom: '2px solid #E5E7EB', // gray-200
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    padding: '16px',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: 'rgba(243, 244, 246, 0.6)', // light hover transparent gray-100
    },
    transition: 'background-color 0.2s ease',
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const MyOrder = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created_at');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [retryLoading, setRetryLoading] = useState(null); // stores order code being retried
    const [cancelLoading, setCancelLoading] = useState(null); // stores order id being cancelled
    const [cancelConfirm, setCancelConfirm] = useState(null); // stores order to confirm cancel
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/user/orders`, {
                    headers: {
                        Authorization: `Bearer ${localStorage?.getItem('token')}`
                    },
                });
                if (Array.isArray(response.data.data)) {
                    setOrders(response.data.data);
                    setFilteredOrders(response.data.data);
                } else {
                    console.error("Response data is not an array:", response.data.data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);


    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}, [])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = orders.filter(order =>
            order.code.toLowerCase().includes(query)
        );
        setFilteredOrders(filtered);
        setPage(0);
    };

    const getStatusChip = (status) => {
        if (!status) return null;
        const normalizedStatus = status.toLowerCase();

        let bg = '#F3F4F6';
        let color = '#374151';
        let border = '#D1D5DB';

        // Premium Soft Colors for badges
        if (['delivered', 'paid', 'success', 'completed'].includes(normalizedStatus)) {
            bg = '#ECFDF5'; color = '#065F46'; border = '#A7F3D0';
        } else if (['pending', 'unpaid', 'processing'].includes(normalizedStatus)) {
            bg = '#FFFBEB'; color = '#92400E'; border = '#FDE68A';
        } else if (['canceled', 'failed', 'cancelled', 'returned'].includes(normalizedStatus)) {
            bg = '#FEF2F2'; color = '#991B1B'; border = '#FECACA';
        } else if (['shipped', 'dispatched', 'out_for_delivery'].includes(normalizedStatus)) {
            bg = '#EFF6FF'; color = '#1E40AF'; border = '#BFDBFE';
        }

        const formattedLabel = status.replace(/_/g, ' ').toUpperCase();
        return (
            <Chip
                label={formattedLabel}
                size="small"
                sx={{
                    bgcolor: bg,
                    color: color,
                    border: `1px solid ${border}`,
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    px: 1,
                    letterSpacing: 0.5,
                    borderRadius: '8px'
                }}
            />
        );
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };

    const formatDate = (timestamp) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
    };

    const isRetryEligible = (row) => {
        const ps = row.payment_status?.toLowerCase();
        const pt = row.payment_type?.toLowerCase();
        const ds = row.delivery_status?.toLowerCase();
        if (ds === 'cancelled') return false;
        return ['unpaid', 'failed'].includes(ps) && pt === 'network_payment';
    };

    const handleRetryPayment = async (orderCode) => {
        setRetryLoading(orderCode);
        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/user/order/${orderCode}/retry-payment`,
                {},
                { headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` } }
            );
            if (response.data.success && response.data.payment_link) {
                window.location.href = response.data.payment_link;
            } else {
                setSnackbar({ open: true, message: response.data.message || 'Unable to process payment.', severity: 'error' });
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        } finally {
            setRetryLoading(null);
        }
    };

    const isCancelEligible = (row) => {
        const ds = row.delivery_status?.toLowerCase();
        const ps = row.payment_status?.toLowerCase();
        const pt = row.payment_type?.toLowerCase();
        if (ds !== 'order_placed') return false;
        // network_payment + paid → never cancel (no refund)
        if (pt === 'network_payment' && ps === 'paid') return false;
        return true;
    };

    const handleCancelOrder = async (orderRow) => {
        setCancelLoading(orderRow.id);
        setCancelConfirm(null);
        try {
            const response = await axios.get(
                `${BASE_URL}/api/v1/user/order/cancel/${orderRow.id}`,
                { headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` } }
            );
            if (response.data.success) {
                setSnackbar({ open: true, message: response.data.message || 'Order has been cancelled.', severity: 'success' });
                // Update local state
                const updatedOrders = orders.map(o =>
                    o.id === orderRow.id ? { ...o, delivery_status: 'cancelled' } : o
                );
                setOrders(updatedOrders);
                setFilteredOrders(updatedOrders.filter(o =>
                    o.code?.toLowerCase().includes(searchQuery.toLowerCase())
                ));
                if (selectedOrder?.id === orderRow.id) {
                    setSelectedOrder({ ...selectedOrder, delivery_status: 'cancelled' });
                }
            } else {
                setSnackbar({ open: true, message: response.data.message || 'Unable to cancel order.', severity: 'error' });
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        } finally {
            setCancelLoading(null);
        }
    };

    return (
        <Box display="flex" className="min-h-screen w-full bg-gray-50/50">
            <Box flexGrow={1} p={{ xs: 2, sm: 3 }} className="m-0 overflow-hidden w-full">

                {/* Overview Cards Section replacing redundant title */}
                <Box mb={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} className="bg-white/40 backdrop-blur-md shadow-lg" sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB' }}>
                                    <ReceiptLong />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold" color="textPrimary">
                                        {orders.length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {t('my_order.total_orders')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} className="bg-white/40 backdrop-blur-md shadow-lg" sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(220, 38, 38, 0.1)', color: '#DC2626' }}>
                                    <CloseIcon />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold" color="textPrimary">
                                        {orders.filter(o => ['canceled', 'failed'].includes(o.payment_status?.toLowerCase())).length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {t('my_order.canceled_orders')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} className="bg-white/40 backdrop-blur-md shadow-lg" sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                                    <SearchIcon />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold" color="textPrimary">
                                        {orders.filter(o => ['paid', 'success'].includes(o.payment_status?.toLowerCase())).length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {t('my_order.successful_orders')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box display="flex" justifyContent="flex-end" alignItems="center" mb={3}>
                    <TextField
                        placeholder={t('my_order.search_by_order_code')}
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearch}
                        size="small"
                        className="bg-white/40 backdrop-blur-md shadow-sm"
                        sx={{
                            width: { xs: '100%', sm: '320px' },
                            borderRadius: '12px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: 'transparent',
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Paper elevation={0} className="bg-white/40 backdrop-blur-md shadow-lg" sx={{ borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.4)', overflow: 'hidden' }}>
                    <TableContainer className='overflow-x-auto w-full' sx={{ backgroundColor: 'transparent' }}>
                        <Table sx={{ minWidth: 800 }} aria-label="premium order table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sortDirection={orderBy === 'code' ? order : false}>
                                        <TableSortLabel active={orderBy === 'code'} direction={orderBy === 'code' ? order : 'asc'} onClick={(event) => handleRequestSort(event, 'code')}>
                                            {t('my_order.order_code')}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" sortDirection={orderBy === 'product_count' ? order : false}>
                                        <TableSortLabel active={orderBy === 'product_count'} direction={orderBy === 'product_count' ? order : 'asc'} onClick={(event) => handleRequestSort(event, 'product_count')}>
                                            {t('my_order.items')}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" sortDirection={orderBy === 'payment_type' ? order : false}>
                                        <TableSortLabel active={orderBy === 'payment_type'} direction={orderBy === 'payment_type' ? order : 'asc'} onClick={(event) => handleRequestSort(event, 'payment_type')}>
                                            {t('my_order.payment_type')}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" sortDirection={orderBy === 'delivery_status' ? order : false}>
                                        <TableSortLabel active={orderBy === 'delivery_status'} direction={orderBy === 'delivery_status' ? order : 'asc'} onClick={(event) => handleRequestSort(event, 'delivery_status')}>
                                            {t('my_order.delivery_status')}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" sortDirection={orderBy === 'payment_status' ? order : false}>
                                        <TableSortLabel active={orderBy === 'payment_status'} direction={orderBy === 'payment_status' ? order : 'asc'} onClick={(event) => handleRequestSort(event, 'payment_status')}>
                                            {t('my_order.payment_status')}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" sortDirection={orderBy === 'grand_total' ? order : false}>
                                        <TableSortLabel active={orderBy === 'grand_total'} direction={orderBy === 'grand_total' ? order : 'asc'} onClick={(event) => handleRequestSort(event, 'grand_total')}>
                                            {t('my_order.amount')}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" sortDirection={orderBy === 'created_at' ? order : false}>
                                        <TableSortLabel active={orderBy === 'created_at'} direction={orderBy === 'created_at' ? order : 'asc'} onClick={(event) => handleRequestSort(event, 'created_at')}>
                                            {t('my_order.date')}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {t('my_order.actions')}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={8}>
                                                <Skeleton animation="wave" height={50} sx={{ borderRadius: '8px' }} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : filteredOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                                            <Typography variant="body1" color="textSecondary">
                                                {t('my_order.no_orders_found')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    stableSort(filteredOrders, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <StyledTableRow key={row.id || row.code}>
                                                <TableCell sx={{ fontWeight: 600, color: '#111827' }}>
                                                    {row.code}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={`${row.product_count} ${row.product_count > 1 ? t('my_order.item_plural') : t('my_order.item_singular')}`}
                                                        size="small"
                                                        sx={{ bgcolor: '#F3F4F6', color: '#4B5563', fontWeight: 600, borderRadius: '6px' }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#6B7280', letterSpacing: 0.5 }}>
                                                        {row.payment_type ? row.payment_type.replace(/_/g, ' ').toUpperCase() : 'N/A'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">{getStatusChip(row.delivery_status)}</TableCell>
                                                <TableCell align="center">{getStatusChip(row.payment_status)}</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700, color: '#111827' }}>
                                                    {`${row.currency || row.main_cur || 'AED'} ${parseFloat(row.grand_total).toFixed(2)}`}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: '#6B7280', fontSize: '0.85rem' }}>
                                                    {formatDate(row.created_at)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box className="flex items-center justify-end gap-1">
                                                        {isRetryEligible(row) && (
                                                            <Tooltip title={t('my_order.pay_now')}>
                                                                <IconButton
                                                                    onClick={() => handleRetryPayment(row.code)}
                                                                    disabled={retryLoading === row.code}
                                                                    size="small"
                                                                    sx={{ bgcolor: '#FEF2F2', color: '#DC2626', '&:hover': { bgcolor: '#FEE2E2' } }}
                                                                >
                                                                    {retryLoading === row.code ? <CircularProgress size={16} color="inherit" /> : <PaymentIcon fontSize="small" />}
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                        {isCancelEligible(row) && (
                                                            <Tooltip title={t('my_order.cancel_order')}>
                                                                <IconButton
                                                                    onClick={() => setCancelConfirm(row)}
                                                                    disabled={cancelLoading === row.id}
                                                                    size="small"
                                                                    sx={{ bgcolor: '#FFF7ED', color: '#EA580C', '&:hover': { bgcolor: '#FFEDD5' } }}
                                                                >
                                                                    {cancelLoading === row.id ? <CircularProgress size={16} color="inherit" /> : <CancelIcon fontSize="small" />}
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                            <Tooltip title={t('my_order.order_details')}>
                                                            <IconButton
                                                                onClick={() => handleViewOrder(row)}
                                                                color="primary"
                                                                sx={{ bgcolor: '#EFF6FF', '&:hover': { bgcolor: '#DBEAFE' } }}
                                                                size="small"
                                                            >
                                                                <Visibility fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </StyledTableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {!loading && filteredOrders.length > 0 && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredOrders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ borderTop: '1px solid rgba(229, 231, 235, 0.5)', backgroundColor: 'transparent' }}
                        />
                    )}
                </Paper>
            </Box>

            {/* Premium Details Dialog */}
            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <Typography variant="h6" fontWeight="bold" color="textPrimary">
                        {t('my_order.order_details')}
                    </Typography>
                    <IconButton aria-label="close" onClick={handleCloseModal} size="small" sx={{ color: '#6B7280' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 0, position: 'relative' }}>
                    <div className="relative flex-grow overflow-y-auto w-full h-full">
                        {/* Watermark Overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: `url(${waterMark})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                opacity: 0.05,
                                zIndex: 0,
                            }}
                        ></div>

                        {/* Order Content */}
                        <div className="relative z-10 p-4 sm:p-8">
                            {selectedOrder && (
                                <Box>
                                    {/* Top Status & Info Bar */}
                                    <Box className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-wrap justify-between items-center gap-4">
                                        <Box>
                                            <Typography variant="body2" color="textSecondary" className="mb-1">{t('my_order.order_hash')}</Typography>
                                            <Typography variant="h5" fontWeight="bold" color="textPrimary">{selectedOrder.code}</Typography>
                                            <Typography variant="body2" color="textSecondary" className="mt-1">{formatDate(selectedOrder.created_at)}</Typography>
                                        </Box>
                                        <Box className="flex gap-3 items-center">
                                            <Box className="flex flex-col items-end">
                                                <Typography variant="body2" color="textSecondary" className="mb-1">{t('my_order.payment')}</Typography>
                                                {getStatusChip(selectedOrder.payment_status)}
                                            </Box>
                                            <Box className="flex flex-col items-end">
                                                <Typography variant="body2" color="textSecondary" className="mb-1">{t('my_order.delivery')}</Typography>
                                                {getStatusChip(selectedOrder.delivery_status)}
                                            </Box>
                                            {isRetryEligible(selectedOrder) && (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleRetryPayment(selectedOrder.code)}
                                                    disabled={retryLoading === selectedOrder.code}
                                                    startIcon={retryLoading === selectedOrder.code ? <CircularProgress size={16} color="inherit" /> : <PaymentIcon />}
                                                    sx={{
                                                        bgcolor: '#1E55AC',
                                                        '&:hover': { bgcolor: '#163d7a' },
                                                        borderRadius: '10px',
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        px: 3
                                                    }}
                                                >
                                                    {t('my_order.pay_now')}
                                                </Button>
                                            )}
                                            {isCancelEligible(selectedOrder) && (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => setCancelConfirm(selectedOrder)}
                                                    disabled={cancelLoading === selectedOrder.id}
                                                    startIcon={cancelLoading === selectedOrder.id ? <CircularProgress size={16} color="inherit" /> : <CancelIcon />}
                                                    sx={{
                                                        color: '#EA580C',
                                                        borderColor: '#EA580C',
                                                        '&:hover': { bgcolor: '#FFF7ED', borderColor: '#C2410C' },
                                                        borderRadius: '10px',
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        px: 3
                                                    }}
                                                >
                                                    {t('my_order.cancel_order')}
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {/* Order Info */}
                                        <Paper elevation={0} className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                                            <Typography variant="subtitle1" fontWeight="bold" className="text-gray-900 mb-4 border-b border-gray-200 pb-2">{t('my_order.order_information')}</Typography>
                                            <Box className="space-y-3">
                                                <Box className="flex justify-between">
                                                    <Typography variant="body2" className="text-gray-500">{t('my_order.delivery_type')}</Typography>
                                                    <Typography variant="body2" fontWeight="600" className="text-gray-800">{selectedOrder.delivery_type ? selectedOrder.delivery_type.replace(/_/g, ' ').toUpperCase() : 'N/A'}</Typography>
                                                </Box>
                                                <Box className="flex justify-between">
                                                    <Typography variant="body2" className="text-gray-500">{t('my_order.payment_method')}</Typography>
                                                    <Typography variant="body2" fontWeight="600" className="text-gray-800">{selectedOrder.payment_type ? selectedOrder.payment_type.replace(/_/g, ' ').toUpperCase() : 'N/A'}</Typography>
                                                </Box>
                                            </Box>
                                        </Paper>

                                        {/* Shipping Address */}
                                        <Paper elevation={0} className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                                            <Typography variant="subtitle1" fontWeight="bold" className="text-gray-900 mb-4 border-b border-gray-200 pb-2">{t('my_order.shipping_address')}</Typography>
                                            {selectedOrder.shipping_address ? (
                                                <Box className="space-y-1">
                                                    <Typography variant="body2" fontWeight="600" className="text-gray-800">{selectedOrder.shipping_address.name || 'Customer'}</Typography>
                                                    <Typography variant="body2" className="text-gray-600">{selectedOrder.shipping_address.address}</Typography>
                                                    <Typography variant="body2" className="text-gray-600">{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.postal_code}</Typography>
                                                    <Typography variant="body2" className="text-gray-600">{selectedOrder.shipping_address.state}, {selectedOrder.shipping_address.country}</Typography>
                                                    <Typography variant="body2" className="text-gray-600 mt-2"><strong>{t('my_order.phone_label')}</strong> {selectedOrder.shipping_address.phone}</Typography>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" className="text-gray-500 italic">{t('my_order.no_shipping_details')}</Typography>
                                            )}
                                        </Paper>

                                        {/* Billing Address */}
                                        <Paper elevation={0} className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                                            <Typography variant="subtitle1" fontWeight="bold" className="text-gray-900 mb-4 border-b border-gray-200 pb-2">{t('my_order.billing_address')}</Typography>
                                            {selectedOrder.billing_address || selectedOrder.shipping_address ? (
                                                <Box className="space-y-1">
                                                    {/* Fallback to shipping if billing doesn't exist explicitly in data structure but conceptually it's the same */}
                                                    <Typography variant="body2" fontWeight="600" className="text-gray-800">
                                                        {(selectedOrder.billing_address && selectedOrder.billing_address.name) || (selectedOrder.shipping_address && selectedOrder.shipping_address.name) || 'Customer'}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-600">{(selectedOrder.billing_address && selectedOrder.billing_address.address) || selectedOrder.shipping_address.address}</Typography>
                                                    <Typography variant="body2" className="text-gray-600">{(selectedOrder.billing_address && selectedOrder.billing_address.city) || selectedOrder.shipping_address.city}, {(selectedOrder.billing_address && selectedOrder.billing_address.postal_code) || selectedOrder.shipping_address.postal_code}</Typography>
                                                    <Typography variant="body2" className="text-gray-600">{(selectedOrder.billing_address && selectedOrder.billing_address.state) || selectedOrder.shipping_address.state}, {(selectedOrder.billing_address && selectedOrder.billing_address.country) || selectedOrder.shipping_address.country}</Typography>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" className="text-gray-500 italic">{t('my_order.no_billing_details')}</Typography>
                                            )}
                                        </Paper>
                                    </div>

                                    {selectedOrder.special_instruction && (
                                        <Box className="bg-yellow-50 rounded-xl p-5 mb-8 border border-yellow-100">
                                            <Typography variant="subtitle2" fontWeight="bold" className="text-yellow-800 mb-2">{t('my_order.special_instructions')}</Typography>
                                            <Typography variant="body2" className="text-yellow-900 whitespace-pre-wrap">{selectedOrder.special_instruction}</Typography>
                                        </Box>
                                    )}

                                    {/* Shipment Tracking */}
                                    {(selectedOrder.courier_name || selectedOrder.tracking_number || selectedOrder.tracking_url) && (
                                        <Box className="bg-blue-50 rounded-xl p-5 mb-8 border border-blue-100">
                                            <Typography variant="subtitle2" fontWeight="bold" className="text-blue-800 mb-3">{t('my_order.shipment_tracking')}</Typography>
                                            <Box className="flex flex-wrap gap-x-8 gap-y-2">
                                                {selectedOrder.courier_name && (
                                                    <Box>
                                                        <Typography variant="caption" className="text-blue-500">{t('my_order.courier')}</Typography>
                                                        <Typography variant="body2" fontWeight="600" className="text-blue-900">{selectedOrder.courier_name}</Typography>
                                                    </Box>
                                                )}
                                                {selectedOrder.tracking_number && (
                                                    <Box>
                                                        <Typography variant="caption" className="text-blue-500">{t('my_order.tracking_number')}</Typography>
                                                        <Typography variant="body2" fontWeight="600" className="text-blue-900">
                                                            {selectedOrder.tracking_url ? (
                                                                <a href={selectedOrder.tracking_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700 inline-flex items-center gap-1">
                                                                    {selectedOrder.tracking_number}
                                                                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                                                                </a>
                                                            ) : (
                                                                selectedOrder.tracking_number
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {selectedOrder.tracking_url && !selectedOrder.tracking_number && (
                                                    <Box>
                                                        <Typography variant="caption" className="text-blue-500">{t('my_order.shipment_tracking')}</Typography>
                                                        <Typography variant="body2" fontWeight="600">
                                                            <a href={selectedOrder.tracking_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 inline-flex items-center gap-1">
                                                                {t('my_order.view_tracking')}
                                                                <OpenInNewIcon sx={{ fontSize: 14 }} />
                                                            </a>
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    )}

                                    {/* Order Items Table */}
                                    <Typography variant="h6" fontWeight="bold" className="text-gray-900 mb-4">{t('my_order.order_items')}</Typography>
                                    <TableContainer component={Paper} elevation={0} className="border border-gray-200 rounded-xl mb-8 overflow-hidden">
                                        <Table sx={{ minWidth: 600 }}>
                                            <TableHead className="bg-gray-50">
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 600, color: '#4B5563', py: 2 }}>{t('my_order.product')}</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 600, color: '#4B5563', py: 2 }}>{t('my_order.unit_price')}</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 600, color: '#4B5563', py: 2 }}>{t('my_order.qty')}</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 600, color: '#4B5563', py: 2 }}>{t('my_order.tax')}</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 600, color: '#4B5563', py: 2 }}>{t('my_order.total')}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedOrder.products && selectedOrder.products.data && selectedOrder.products.data.map((product) => (
                                                    <TableRow key={product.id} className="hover:bg-gray-50/50">
                                                        <TableCell>
                                                            <Box className="flex items-center gap-4">
                                                                <Box className="w-14 h-14 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 bg-white">
                                                                    <img src={product?.images ? ImageURL + product.images : defaultImage} alt={product.name} className="w-full h-full object-cover" />
                                                                </Box>
                                                                <Typography variant="body2" fontWeight="600" className="text-gray-800">{product.name}</Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center" className="text-gray-600">{`${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(product.price).toFixed(2)}`}</TableCell>
                                                        <TableCell align="center">
                                                            <Box className="inline-flex items-center justify-center bg-gray-100 px-3 py-1 rounded-full">
                                                                <Typography variant="body2" fontWeight="bold" className="text-gray-700">{product.quantity}</Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center" className="text-gray-600">{`${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(product.tax).toFixed(2)}`}</TableCell>
                                                        <TableCell align="right" className="text-gray-900" sx={{ fontWeight: 600 }}>{`${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(product.total).toFixed(2)}`}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Order Summary */}
                                    <Box className="flex justify-end">
                                        <Box className="w-full sm:w-96 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                            <Box className="space-y-4">
                                                <Box className="flex justify-between items-center">
                                                    <Typography variant="body2" className="text-gray-500">{t('my_order.subtotal')}</Typography>
                                                    <Typography variant="body2" fontWeight="600" className="text-gray-800">{`${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(selectedOrder.subtotal).toFixed(2)}`}</Typography>
                                                </Box>
                                                <Box className="flex justify-between items-center">
                                                    <Typography variant="body2" className="text-gray-500">{t('my_order.tax')}</Typography>
                                                    <Typography variant="body2" fontWeight="600" className="text-gray-800">{`${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(selectedOrder.tax).toFixed(2)}`}</Typography>
                                                </Box>
                                                <Box className="flex justify-between items-center">
                                                    <Typography variant="body2" className="text-gray-500">{t('my_order.shipping')}</Typography>
                                                    <Typography variant="body2" fontWeight="600" className="text-gray-800">{`${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(selectedOrder.shipping_cost).toFixed(2)}`}</Typography>
                                                </Box>
                                                {parseFloat(selectedOrder.coupon_discount) > 0 && (
                                                    <Box className="flex justify-between items-center text-green-600">
                                                        <Typography variant="body2" fontWeight="500">{t('my_order.discount')}</Typography>
                                                        <Typography variant="body2" fontWeight="600">{`- ${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(selectedOrder.coupon_discount).toFixed(2)}`}</Typography>
                                                    </Box>
                                                )}
                                                <Divider className="my-2" />
                                                <Box className="flex justify-between items-center">
                                                    <Typography variant="h6" fontWeight="bold" className="text-gray-900">{t('my_order.total')}</Typography>
                                                    <Typography variant="h6" fontWeight="bold" color="primary">{`${selectedOrder.currency || selectedOrder.main_cur || 'AED'} ${parseFloat(selectedOrder.grand_total).toFixed(2)}`}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Cancel Order Confirmation Dialog */}
            <Dialog
                open={!!cancelConfirm}
                onClose={() => setCancelConfirm(null)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="textPrimary">
                        {t('my_order.confirm_cancel_title')}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="textSecondary">
                        {t('my_order.confirm_cancel_message', { code: cancelConfirm?.code })}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={() => setCancelConfirm(null)}
                        sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, color: '#6B7280' }}
                    >
                        {t('my_order.no_keep_it')}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleCancelOrder(cancelConfirm)}
                        disabled={cancelLoading === cancelConfirm?.id}
                        startIcon={cancelLoading === cancelConfirm?.id ? <CircularProgress size={16} color="inherit" /> : <CancelIcon />}
                        sx={{
                            bgcolor: '#DC2626',
                            '&:hover': { bgcolor: '#B91C1C' },
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3
                        }}
                    >
                        {t('my_order.yes_cancel')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for retry payment messages */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MyOrder;
