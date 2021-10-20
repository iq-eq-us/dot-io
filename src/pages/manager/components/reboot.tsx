import  {mainControler} from '../../manager/controls/mainControls ';


export async function reboot(){
    //Sends the restart command to the charachorder via the serial API
    await mainControler.sendCommandString("RESTART");
    await mainControler.readGetNone();
  }