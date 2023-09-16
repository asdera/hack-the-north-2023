import React from 'react';

const ShakeContext = React.createContext();

export const ShakeProvider = ShakeContext.Provider;
export const ShakeConsumer = ShakeContext.Consumer;

export default ShakeContext;