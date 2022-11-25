import React from 'react';

const context = React.createContext(JSON.parse(localStorage.getItem("COUNT")));
export default context;