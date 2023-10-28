import React from 'react';

/**  helps to ensure context consumer hook is only used inside it's provider  */
export function generateContext<T>() {
  const context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const contextValue = React.useContext(context);

    if (contextValue === undefined) {
      throw new Error("Context being used outside it's provider!");
    }

    return contextValue as Exclude<T, undefined>;
  }

  return [context, useContext] as const;
}
