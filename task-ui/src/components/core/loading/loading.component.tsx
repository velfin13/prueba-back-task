import './loading.css'

export interface LoadingProps {
    isFullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isFullScreen = false }) => {
    return (
        <div className={isFullScreen ? 'loadingWrapper' : ''}>
            <div className="hourglassBackground">
                <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                </div>
            </div>
        </div>
    );
};