import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import {
  Box, Button, CircularProgress, Grid, Typography,
  Collapse, Skeleton, Drawer
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import ajaxService from '../../services/ajax-service'
import { CATEGORIES } from '../../constants'
import { AddToCartModal } from '../index'
import ProductGrid from '../Products/ProductGrid'
import ProductLoadingSkeleton from '../Products/ProductLoadingSkeleton'
import { useTranslation } from 'react-i18next'
import { getCategoryName } from '../../utils'
import { TbGridDots } from "react-icons/tb"

/* ─────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────── */
const Sidebar = ({ categories, selectedParent, selectedChild, onSelectParent, onSelectChild, loading, i18n }) => {
  const [expanded, setExpanded] = useState({})
  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  useEffect(() => {
    if (selectedParent) setExpanded(prev => ({ ...prev, [selectedParent.id]: true }))
  }, [selectedParent])

  if (loading) {
    return (
      <Box sx={{ pr: 2 }}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height={36} sx={{ mb: 0.5, borderRadius: 1 }} />
        ))}
      </Box>
    )
  }

  return (
    <Box sx={{ pr: { xs: 0, md: 2 } }}>
      <Box sx={{
        background: '#2858A3', color: '#fff',
        px: 2, py: 1.5, borderRadius: '6px 6px 0 0',
        display: 'flex', alignItems: 'center', gap: 1,
      }}>
        <TbGridDots className='text-2xl' />
        <Typography className="poppins" sx={{ fontSize: 13, fontWeight: 600 }}>
          All Categories
        </Typography>
      </Box>

      <Box sx={{
        border: '1px solid #e5e7eb', borderTop: 'none',
        borderRadius: '0 0 6px 6px', overflow: 'hidden',
      }}>
        {categories.filter(c => c.id !== 0).map((cat) => {
          const isActive = selectedParent?.id === cat.id
          const isExpanded = expanded[cat.id]
          const hasChildren = cat.childrens && cat.childrens.length > 0
          const catName = getCategoryName(cat, i18n.language) || cat.name

          return (
            <Box key={cat.id}>
              <Box
                onClick={() => { onSelectParent(cat); if (hasChildren) toggle(cat.id) }}
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  px: 2, py: 1, cursor: 'pointer',
                  background: isActive ? '#EEF3FB' : '#fff',
                  borderBottom: '1px solid #f3f4f6',
                  '&:hover': { background: '#f9fafb' },
                  position: 'relative',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#2858A3' : '#374151',
                  pl: 2,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0, top: 0,
                    height: '100%', width: '3px',
                    backgroundColor: isActive ? '#2858A3' : 'transparent',
                    borderRadius: '2px',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ChevronRightIcon sx={{ fontSize: 14, color: isActive ? '#2858A3' : '#9ca3af' }} />
                  <Typography className="poppins" sx={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#2858A3' : '#374151',
                  }}>
                    {catName}
                  </Typography>
                </Box>
                {hasChildren && (
                  isExpanded
                    ? <ExpandLessIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                    : <ExpandMoreIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                )}
              </Box>

              {hasChildren && (
                <Collapse in={isExpanded}>
                  {cat.childrens.map((child) => {
                    const isChildActive = selectedChild?.id === child.id
                    const childName = getCategoryName(child, i18n.language) || child.name
                    return (
                      <Box
                        key={child.id}
                        onClick={(e) => { e.stopPropagation(); onSelectChild(cat, child) }}
                        sx={{
                          pl: 4, pr: 2, py: 0.8, cursor: 'pointer',
                          background: isChildActive ? '#EEF3FB' : '#fafafa',
                          borderBottom: '1px solid #f3f4f6',
                          '&:hover': { background: '#f3f4f6' },
                        }}
                      >
                        <Typography className="poppins" sx={{
                          fontSize: 12,
                          fontWeight: isChildActive ? 600 : 400,
                          color: isChildActive ? '#2858A3' : '#4b5563',
                        }}>
                          {childName}
                        </Typography>
                      </Box>
                    )
                  })}
                </Collapse>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

/* ─────────────────────────────────────────────
   SUB-CATEGORY TABS
───────────────────────────────────────────── */
const MAX_VISIBLE_TABS = 10

const SubCategoryTabs = ({ items, selectedId, onSelect }) => {
  if (!items || items.length === 0) return null

  const visibleItems = items.slice(0, MAX_VISIBLE_TABS)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 0, gap: 0 }}>
      <Box sx={{
        display: 'flex', alignItems: 'center',
        flex: 1, minWidth: 0,
        overflow: 'hidden',
        borderBottom: '1px solid #e5e7eb',
      }}>
        {visibleItems.map((item) => {
          const isActive = selectedId === item.id
          return (
            <Box
              key={item.id}
              onClick={() => onSelect(item)}
              sx={{
                px: { xs: 1, sm: 1.5, md: 2 }, py: 0.8,
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                fontSize: { xs: 11, sm: 12, md: 13 },
                fontFamily: '"Poppins", sans-serif',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2858A3' : '#374151',
                borderBottom: isActive ? '2px solid #2858A3' : '2px solid transparent',
                transition: 'all 0.15s',
                '&:hover': { color: '#2858A3' },
              }}
            >
              {item.name}
            </Box>
          )
        })}
      </Box>

      <Box sx={{ flexShrink: 0, pl: 1 }}>
        <Button
          onClick={() => onSelect(null)}
          variant="outlined"
          size="small"
          sx={{
            fontSize: 12, fontFamily: '"Poppins", sans-serif',
            textTransform: 'none', borderColor: '#e5e7eb',
            color: '#374151', borderRadius: '4px',
            px: 1.5, py: 0.4, whiteSpace: 'nowrap',
            '&:hover': { borderColor: '#2858A3', color: '#2858A3' },
          }}
        >
          View all
        </Button>
      </Box>
    </Box>
  )
}

/* ─────────────────────────────────────────────
   STICKY SIDEBAR HOOK
   Works regardless of parent overflow settings.
   - wrapperRef: the full-height column (tracks when component ends)
   - panelRef:   the visible sidebar card
   - Switches panel to position:fixed while wrapper is in view,
     then releases it back to normal flow once we scroll past.
───────────────────────────────────────────── */
function useStickyPanel(topOffset = 20) {
  const wrapperRef = useRef(null)
  const panelRef = useRef(null)

  const update = useCallback(() => {
    const wrapper = wrapperRef.current
    const panel = panelRef.current
    if (!wrapper || !panel) return

    const wrapperRect = wrapper.getBoundingClientRect()
    const panelHeight = panel.offsetHeight

    if (wrapperRect.top <= topOffset && wrapperRect.bottom > topOffset + panelHeight) {
      // STICKY: wrapper is still in view — fix the panel
      panel.style.position = 'fixed'
      panel.style.top = `${topOffset}px`
      panel.style.width = `${wrapperRect.width}px`
      panel.style.left = `${wrapperRect.left}px`
      panel.style.zIndex = '10'
    } else if (wrapperRect.bottom <= topOffset + panelHeight) {
      // BOTTOM REACHED: stick to the bottom of the wrapper
      panel.style.position = 'absolute'
      panel.style.top = `${wrapperRect.height - panelHeight}px`
      panel.style.width = '100%'
      panel.style.left = '0'
      panel.style.zIndex = '10'
    } else {
      // NORMAL: above the sticky point
      panel.style.position = 'relative'
      panel.style.top = '0'
      panel.style.width = '100%'
      panel.style.left = 'auto'
      panel.style.zIndex = 'auto'
    }
  }, [topOffset])

  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  return { wrapperRef, panelRef, update }
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const HomeProductsSection = ({ isGridView = true }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur'

  const LIMIT = 8

  const [categories, setCategories] = useState([])
  const [sidebarLoading, setSidebarLoading] = useState(true)
  const [selectedParent, setSelectedParent] = useState(null)
  const [selectedChild, setSelectedChild] = useState(null)
  const [selectedSubChild, setSelectedSubChild] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [cartModal, setCartModal] = useState(false)
  const [modalProduct, setModalProduct] = useState({})

  // Sticky sidebar
  const { wrapperRef, panelRef, update: updateSticky } = useStickyPanel(20)

  useEffect(() => {
    const load = async () => {
      const response = await ajaxService.get('/all-categories')
      if (response.success) {
        setCategories(response.data)
        if (response.data.length > 0) setSelectedParent(response.data[0])
      }
      setSidebarLoading(false)
    }
    load()
  }, [])

  // Re-measure sticky when sidebar content changes
  useEffect(() => { updateSticky() }, [categories, selectedParent, sidebarLoading, updateSticky])

  const { categoryType, categoryId } = useMemo(() => {
    if (selectedSubChild) return { categoryType: CATEGORIES.SUB_CHILD, categoryId: selectedSubChild.id }
    if (selectedChild)    return { categoryType: CATEGORIES.CHILD,     categoryId: selectedChild.id }
    if (selectedParent)   return { categoryType: CATEGORIES.PARENT,    categoryId: selectedParent.id }
    return { categoryType: CATEGORIES.ALL, categoryId: 0 }
  }, [selectedParent, selectedChild, selectedSubChild])

  const fetchProducts = useCallback(async () => {
    const token = localStorage.getItem('token')
    const user  = localStorage.getItem('user') ?? null
    const params = new URLSearchParams({
      category_id: categoryId,
      type: categoryType,
      offset: 0,
      limit: LIMIT,
      brand_id: 0,
      new_arrival: false,
    })
    if (token && user) params.append('user_id', JSON.parse(user).id)
    const response = await ajaxService.get(`/category/products?${params.toString()}`)
    return response || null
  }, [categoryId, categoryType])

  useEffect(() => {
    if (sidebarLoading) return
    let cancelled = false
    const load = async () => {
      setProductsLoading(true)
      setProducts([])
      const response = await fetchProducts()
      if (!cancelled && response) setProducts((response.data ?? []).slice(0, LIMIT))
      if (!cancelled) setProductsLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [fetchProducts, sidebarLoading])

  const handleSelectParent = (cat) => {
    setSelectedParent(cat)
    setSelectedChild(null)
    setSelectedSubChild(null)
  }

  const handleSelectChild = (parent, child) => {
    setSelectedParent(parent)
    setSelectedChild(child)
    setSelectedSubChild(null)
    setDrawerOpen(false)
  }

  const subTabs = useMemo(() => selectedParent?.childrens || [], [selectedParent])

  const handleModalClick = (e, product) => {
    e.stopPropagation()
    setCartModal(true)
    setModalProduct(product)
  }

  const sidebarContent = (
    <Sidebar
      categories={categories}
      selectedParent={selectedParent}
      selectedChild={selectedChild}
      onSelectParent={handleSelectParent}
      onSelectChild={handleSelectChild}
      loading={sidebarLoading}
      i18n={i18n}
    />
  )

  return (
    <Box
      dir={isRTL ? 'rtl' : 'ltr'}
      sx={{ width: '100%', background: '#fff', py: 3, px: { xs: 1.5, sm: 3, md: 5, lg: 8 } }}
    >
      {/* Mobile drawer toggle */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, mb: 1.5 }}>
        <Button
        className='mb-3'
          startIcon={<MenuIcon />}
          onClick={() => setDrawerOpen(true)}
          variant="outlined"
          size="small"
          sx={{ fontFamily: '"Poppins", sans-serif', fontSize: 12, textTransform: 'none', borderColor: '#2858A3', color: '#2858A3' }}
        >
          Categories
        </Button>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>{sidebarContent}</Box>
      </Drawer>

      <Grid container >

        {/* ── Desktop Sticky Sidebar ── */}
        <Grid
          item xs={12} md={3}
          sx={{
            display: { xs: 'none', md: 'block' },
            // CRITICAL: position:relative so the absolute fallback
            // (when panel reaches component bottom) is relative to this column
            position: 'relative',
          }}
          ref={wrapperRef}
        >
          {/*
            panelRef: starts as position:relative (normal flow).
            useStickyPanel switches it to:
              • position:fixed   → while the section is in view (sidebar sticks to viewport)
              • position:absolute → when we've scrolled past the section bottom (sidebar stays at bottom of column)
              • position:relative → before the section reaches the top (normal flow)
          */}
          <div ref={panelRef} style={{ position: 'relative', width: '100%' }}>
            {sidebarContent}
          </div>
        </Grid>

        {/* ── Main content ── */}
        <Grid className='border p-4 rounded-2xl border-[#2858A3]' item xs={12} md={9}>
          <SubCategoryTabs
            items={subTabs}
            selectedId={selectedChild?.id}
            onSelect={(item) => {
              setSelectedChild(item)
              setSelectedSubChild(null)
            }}
          />

          <Grid container>
            {productsLoading ? (
              <ProductLoadingSkeleton />
            ) : products.length === 0 ? (
              <Grid item xs={12} sx={{ textAlign: 'center', py: 8 }}>
                <Typography className="poppins" color="text.secondary">
                  No products found in this category.
                </Typography>
              </Grid>
            ) : (
              <ProductGrid
                sortedProducts={products}
                navigate={navigate}
                handleModalClick={handleModalClick}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      {Object.keys(modalProduct).length > 0 && (
        <AddToCartModal
          visible={cartModal}
          setVisible={setCartModal}
          product={modalProduct}
        />
      )}
    </Box>
  )
}

export default HomeProductsSection