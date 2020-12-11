import React from 'react';
import { SimpleTextField } from './SimpleTextField';

const SearchTextField = (props) => {
  return <SimpleTextField type="search" variant="outlined" size="small" {...props} />;
};

export { SearchTextField };
