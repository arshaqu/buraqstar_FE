import React from 'react';
import { List, ListItem, ListItemText, Typography, Skeleton } from '@mui/material';

const StoreListComponent = ({ stores, onSelectStore, loading }) => {
  if (loading) {
    return (
      <div className="store-list">
        <Skeleton variant="rectangular" width="100%" height={60} />
        <Skeleton variant="rectangular" width="100%" height={60} style={{ marginTop: '10px' }} />
        <Skeleton variant="rectangular" width="100%" height={60} style={{ marginTop: '10px' }} />
        <Skeleton variant="rectangular" width="100%" height={60} style={{ marginTop: '10px' }} />
      </div>
    );
  }

  return (
    <div className="store-list">
      <List>
        {stores.map(store => (
          <ListItem button key={store.id} onClick={() => onSelectStore(store)}>
            <ListItemText
              primary={store.name}
              secondary={store.address}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default StoreListComponent;
