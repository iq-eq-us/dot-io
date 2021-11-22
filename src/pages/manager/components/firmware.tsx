import React from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { Link } from 'react-router-dom';
import '../../../../public/firmwareUpdates/0.8.2/CURRENT.UF2';


export default function Firmware() {
    return (
        <Accordion style={{position:'relative',paddingRight:'70%', paddingBottom:'3%', borderColor: "#121212"}} allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        CharaChorder Firmware
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        CharaChorder Firmware version 0.8.2 (Latest) <a href="../../../../public/firmwareUpdates/0.8.2/CURRENT.UF2" className="text-[#0645AD] hover:text-[#0000EE] active:text-[##551A8B]"download> Download</a>

                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}