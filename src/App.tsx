import { useState } from 'react';
import './App.css';
import { Button } from '@progress/kendo-react-buttons';

// 1. Importa o novo componente de fluxo único
import FontUploadFlowDialog from './FontUploadFlowDialog'; 
// import reactLogo from './assets/react.svg' // Removido para simplificar
// import viteLogo from '/vite.svg' // Removido para simplificar

function App() {
  const [isFlowOpen, setIsFlowOpen] = useState(false);
  // Você pode remover o 'count' se não for mais necessário

  // Função que será chamada após a conclusão do upload
  const processFontFile = (file: File) => {
    console.log(`✅ Arquivo .FPZ pronto para processamento: ${file.name}`);
    
    // ** Implemente sua lógica de envio (e.g., fetch, axios) aqui **
    // Exemplo: upload o arquivo 'file' para o seu servidor.
    
    // O modal já será fechado após esta chamada pelo componente FontUploadFlowDialog.
  };

  const handleOpenFlow = () => {
      setIsFlowOpen(true);
  }

  return (
    <>
      {/* Seus elementos padrão... */}
      <h1>Vite + React</h1>
      
      <div className="card">
        {/* Adiciona o botão para iniciar o fluxo de upload */}
        <Button 
            onClick={handleOpenFlow} 
            themeColor="primary" 
            style={{ marginBottom: '20px' }}
        >
            Abrir Upload de Fonte
        </Button>
        {/* Você pode substituir o conteúdo de contagem aqui */}
        <p className="read-the-docs">
          Clique no botão acima para iniciar o fluxo de Termos e Upload em uma única janela.
        </p>
      </div>

      {/* Componente ÚNICO que gerencia o fluxo */}
      <FontUploadFlowDialog
        isOpen={isFlowOpen}
        onClose={() => setIsFlowOpen(false)}
        onFontUpload={processFontFile}
      />
    </>
  );
}

export default App;