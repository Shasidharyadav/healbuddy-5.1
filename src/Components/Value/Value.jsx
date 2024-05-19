import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import './Value.css';
import data from '../../utils/accordion';

const Value = () => {
    // State to control expanded items
    const [expandedItems, setExpandedItems] = useState([]);

    // Handler to update expanded items
    const handleToggle = (uuid) => {
        const currentIndex = expandedItems.indexOf(uuid);
        const newExpandedItems = currentIndex === -1
            ? [...expandedItems, uuid]
            : expandedItems.filter(id => id !== uuid);

        setExpandedItems(newExpandedItems);
    };

    return (
        <section className="v-wrapper" id='our-cares'>
            <div className="paddings innerWidth flexCenter v-container">
                <div className="v-left">
                    <div className="image-container">
                        <img src="./value.png" alt="" />
                    </div>
                </div>

                <div className="flexColStart v-right r-head">                 
                    <span className='orangeText'>About Us</span>
                    <span className='primaryText '>HealBuddy</span>
                    <span className='secondaryText hel'>HealBuddy is a conservative form of wellness for your muscles that customizes a continuum of care. The care helps in strengthening muscles, preventing muscle degeneration and treating musculoskeletal conditions that cause pain. It is also capable of care to conditions that have been prescribed surgery or are post surgical in nature.</span>

                    <Accordion
                        className='accordion'
                        allowMultipleExpanded={false}
                        allowZeroExpanded
                        onChange={setExpandedItems}
                        preExpanded={expandedItems}
                    >
                        {data.map((item, i) => (
                            <AccordionItem className="accordionItem" key={i} uuid={i}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className='flexCenter accordionButton'>
                                        <div className="flexCenter icon">{item.icon}</div>
                                        <span className="primaryText">{item.heading}</span>
                                        <div className="flexCenter icon">
                                            <MdOutlineArrowDropDown size={20} />
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p className="secondaryText">{item.detail}</p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default Value;