
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div
    style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',

    }}
    >
        
<Spinner
    style={{
        width: 30,
        height: 30,
        
    }}

    animation="border"
/>

</div>


  );
};

export default Loading;