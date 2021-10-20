async function bootLoader(){
    //Sends the bootloader command to the charachorder via the serial API
    await sendCommandString("BOOTLOADER");
    await readGetNone();
  }