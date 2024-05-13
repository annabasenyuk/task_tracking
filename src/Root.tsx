import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { AllToDoPage } from './pages/AllToDoPage';
import { ActiveToDoPage } from './pages/ActiveToDoPage';
import { CompletedToDoPage } from './pages/CompletedToDoPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/task_tracking/" element={<App />}>
            <Route index element={<AllToDoPage />} />
            <Route path="all" element={<Navigate to="/task_tracking/" replace />} />
            <Route path="active" element={<ActiveToDoPage />} />
            <Route path="completed" element={<CompletedToDoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};