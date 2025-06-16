import NotificationSystem from './NotificationSystem';
import FloatingResultMessage from './FloatingResultMessage';

const AppLayout = ({ children }) => {
    return (
        <>
            {children}
            <NotificationSystem />
            <FloatingResultMessage />
        </>
    );
};

export default AppLayout;
