async function disconnectSerialConnection(){
    console.log('disconnectSerialConnection()');
    if(serialPort){
      console.log('closing serial port');
      lineReader.releaseLock();
      console.log(serialPort.readable);
      await lineReaderDone.catch(() => { /* Ingore the error */});
      await serialPort.close();
  
      console.log('serial port is closed');
    }else{
      console.log('there is no serial connection open to close');
    }
  }