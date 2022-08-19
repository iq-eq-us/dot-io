import React, {ReactElement} from "react";
import RefreshIcon from "./RefreshIcon";
import ForwardIcon from "./ForwardIcon";
import { useStoreState, useStoreActions } from "easy-peasy";


function NextTestButton(): ReactElement {

    const wordTestNumber = useStoreState((store : any) => store.wordTestNumber,);
  const currentTrainingScenario = useStoreState((store : any) => store.currentTrainingScenario,);
  const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
  const payload = [currentTrainingScenario, wordTestNumber];



return(
<div
className="p-2 bg-[#333] flex items-center z-0 justify-center content-center items-center w-10 rounded m-auto mt-4 cursor-pointer hover:bg-[#444] active:bg-[#222]"
onClick={() => {
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload);
  }}>
<ForwardIcon />
</div>
)
}

export default NextTestButton;