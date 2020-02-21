import { useEffect, useRef, useState } from "react";

export default (cb, delay) => {
    const [cbValue, setCbValue] = useState(cb());
    const cbRef = useRef(cb);

    // Rember the latest callback
    useEffect(() => cbRef.current = cb, [cb]);
    useEffect(() => {
        let id = null;
        let tick = () => {
            setCbValue(cbRef.current());
            id = setTimeout(tick, delay);
        }
        id = setTimeout(tick, delay);
        return () => clearTimeout(id); 
    }, [delay]);

    return cbValue;
}