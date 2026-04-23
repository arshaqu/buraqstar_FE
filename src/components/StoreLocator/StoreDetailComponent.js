import React from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const StoreDetailComponent = ({ store }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {store.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {store.address}
        </Typography>
        <Typography variant="body2">
          Flavors:
        </Typography>
        <List>
          {store.flavors.map(flavor => (
            <ListItem key={flavor}>
              {flavor}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default StoreDetailComponent;
