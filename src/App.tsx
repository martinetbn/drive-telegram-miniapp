import { useEffect } from 'react';
import { showPopup } from '@telegram-apps/sdk-react';

const App = () => {
  useEffect(() => {
    showPopup({
      title: 'Hello',
      message: 'This is a popup',
      buttons: [
        {
          id: 'yes',
          text: 'Yes',
        },
        {
          id: 'no',
          type: 'destructive',
          text: 'No',
        },
      ],
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Rsbuild with React</h1>
      <p className="text-lg">Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
