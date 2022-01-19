import React from 'react';

export default function Switch(props = {}) {
  console.info(props)
  const { pageName } = props;
  return <h1>Switch-{pageName}</h1>;
}
