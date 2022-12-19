import {ProgressStepI} from "../../models/progress-step";

const ProgressSteps:ProgressStepI[] = [
    {
        title: 'Welcome',
        active: true,
        connected: false,
        filled: false
    },
    {
        title: 'Connect your Shopify store',
        active: false,
        connected: false,
        filled: false
    },
    {
        title: 'Connect your customer support email',
        active: false,
        connected: false,
        filled: false
    },
    {
        title: 'Done',
        active: false,
        connected: false,
        filled: false
    },
];

export default ProgressSteps;