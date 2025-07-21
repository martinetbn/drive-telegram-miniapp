import { showPopup } from '@telegram-apps/sdk-react';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Rsbuild with React</h1>
      <p className="text-lg">Start building amazing things with Rsbuild.</p>
      <button
        onClick={() =>
          showPopup({
            title: 'Hello',
            message: 'This is a popup',
          })
        }
      >
        Show popup
      </button>
    </div>
  );
};

export default App;
