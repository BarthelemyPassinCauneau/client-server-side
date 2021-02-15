//https://coronavirusapi-france.now.sh/FranceLiveGlobalData

const RealTimeData = ({data}) => (
    <p>
        {
        data[0].casConfirme
        }
    </p>
);

export default RealTimeData;
