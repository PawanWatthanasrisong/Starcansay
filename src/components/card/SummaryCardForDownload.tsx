import React, { useRef, useEffect, forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import LifeStar from '../box/helpers/LifeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';

const SummaryCardForDownload = ({ handleGraphData, setCardRef }: { handleGraphData: any; setCardRef: (ref: HTMLDivElement | null) => void; }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Pass the ref to the parent component
        if (cardRef.current) {
            setCardRef(cardRef.current);
        }
    }, [setCardRef]);

    const graphData = handleGraphData;
    const xAxis = 34;

    return (
        <div ref={cardRef}>
            <Card className="flex flex-col w-[108px] h-[192px] rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-center flex flex-col items-center">
                        <img src="/images/starcansaylogo-31.png" width={300} />
                        <p className="text-xl md:text-lg">ดวงชีวิตของนะมามิ ในวัย 34 ปี</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col justify-evenly w-full text-xs">
                    <b>คำอธิบายชีวิต</b>
                    <div className="bg-starcansaypink rounded-lg border-8 border-starcansaypink">
                        <p>
                            {graphData ? LifeStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                        </p>
                    </div>
                    <b>คำอธิบายโชค</b>
                    <div className="bg-starcansaypink rounded-lg border-8 border-starcansaypink">
                        <p>
                            {graphData ? LuckStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                        </p>
                    </div>
                    <b>คำอธิบายความท้าทาย</b>
                    <div className="bg-starcansaypink rounded-lg border-8 border-starcansaypink">
                        <p>
                            {graphData ? ChallengeStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SummaryCardForDownload;