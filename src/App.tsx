import { useState } from 'react';
import './App.css';
import { Button } from '@progress/kendo-react-buttons';
import FontUploadFlowDialog from './FontUploadFlowDialog'; 


function App() {
  const [isFlowOpen, setIsFlowOpen] = useState(false);

  const processFontFile = (file: File) => {
    console.log(`✅ Arquivo .FPZ pronto para processamento: ${file.name}`);
    
  };

  const handleOpenFlow = () => {
      setIsFlowOpen(true);
  }

  return (
    <>
     
      <h1>Vite + React</h1>
      
      <div className="card">
        <Button 
            onClick={handleOpenFlow} 
            themeColor="primary" 
            style={{ marginBottom: '20px' }}
        >
            Abrir Upload de Fonte
        </Button>
        <p className="read-the-docs">
          Clique no botão acima para iniciar o fluxo de Termos e Upload.
        </p>
      </div>

      
      <FontUploadFlowDialog
        isOpen={isFlowOpen}
        onClose={() => setIsFlowOpen(false)}
        onFontUpload={processFontFile}
      />
    </>
  );
}

export default App;