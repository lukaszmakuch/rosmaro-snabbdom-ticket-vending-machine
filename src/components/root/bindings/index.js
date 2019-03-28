import handler0 from './main/Error/index.js';
import handler1 from './main/index.js';
import handler2 from './main/MeansOfTransport/index.js';
import handler3 from './main/Order/index.js';
import handler4 from './main/Reset/index.js';
import handler5 from './main/Tariffs/index.js';
import handler6 from './main/Tariffs#1/index.js';
import handler7 from './main/Tariffs#2/index.js';
import handler8 from './main/Thanks/index.js';
import handler9 from './main/Zones/index.js';
export default opts => ({
    'main:Error': handler0(opts),
    'main': handler1(opts),
    'main:MeansOfTransport': handler2(opts),
    'main:Order': handler3(opts),
    'main:Reset': handler4(opts),
    'main:Tariffs': handler5(opts),
    'main:Tariffs#1': handler6(opts),
    'main:Tariffs#2': handler7(opts),
    'main:Thanks': handler8(opts),
    'main:Zones': handler9(opts)
});