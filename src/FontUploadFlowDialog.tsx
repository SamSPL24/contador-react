// src/FontUploadFlowDialog.tsx

import * as React from 'react';
// MUDANÇA: Tentando nomes alternativos (DialogContainer, DialogAction) ou removendo exportações problemáticas.
// Vamos tentar remover Content e Actions e usar os nomes mais prováveis diretamente.
import { Dialog } from '@progress/kendo-react-dialogs'; 
import { Button } from '@progress/kendo-react-buttons';
import { Upload } from '@progress/kendo-react-upload';

// ** ATENÇÃO: Se as tags abaixo falharem, use o nome alternativo sugerido pelo seu VS Code!
// Ex: Se <DialogContainer> falhar, use a tag <DialogContent>
const DialogContainer = (Dialog as any).Container || 'div';
const DialogAction = (Dialog as any).Action || 'div'; 

interface FontUploadFlowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFontUpload: (file: File) => void;
}

const FontUploadFlowDialog: React.FC<FontUploadFlowDialogProps> = ({
  isOpen,
  onClose,
  onFontUpload,
}) => {
  const [areTermsAccepted, setAreTermsAccepted] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setAreTermsAccepted(false);
      setUploadedFile(null);
      setIsCheckboxChecked(false);
    }
  }, [isOpen]);

  const handleFileAdd = (event: any) => {
    const files = event.newState.files;
    if (files && files.length > 0 && files[0].state === 'selected') {
      const file = files[0].rawFile;
      setUploadedFile(file);
    } else {
      setUploadedFile(null);
    }
  };
  
  const handleCloseUpload = () => {
    if (uploadedFile) {
      onFontUpload(uploadedFile); 
    }
    onClose(); 
  };


  if (!isOpen) {
    return null;
  }
  
  const title = areTermsAccepted ? "Upload Font" : "Terms and Conditions";
  const width = areTermsAccepted ? 450 : 600;
  
  return (
    <Dialog 
      title={title} 
      onClose={onClose} 
      style={{ width: width }}
    >
      
      {/* MUDANÇA: Usando uma div simples ou o nome alternativo (DialogContainer) */}
      {/* SE ISTO FALHAR, USE A TAG <div> SIMPLES: <div> */}
      <DialogContainer> 
        {!areTermsAccepted ? (
          // --- VIEW: TERMOS E CONDIÇÕES ---
          <>
            <p>
              By selecting "I Agree" you represent and warrant that you have obtained all necessary licenses and 
              rights to use any third party fonts submitted. You agree to indemnify HID (and its Affiliates, 
              officers, directors, employees and agents), from and against any losses, costs or damages arising 
              from any claims alleging or arising out of any patent, copyright, trade secret or trademark 
              infringement resulting from or in connection with any third party fonts submitted.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                I Agree
                <input 
                  type="checkbox" 
                  checked={isCheckboxChecked} 
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)} 
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>
          </>
        ) : (
          // --- VIEW: UPLOAD DA FONTE ---
          <div style={{ padding: '20px 0' }}>
            <Upload
              batch={false}
              multiple={false}
              restrictions={{ allowedExtensions: ['.fpz'] }}
              autoUpload={false}
              showFileList={true}
              defaultFiles={uploadedFile ? [{ name: uploadedFile.name, size: uploadedFile.size, state: 'selected' } as any] : []}
              onRemove={() => setUploadedFile(null)}
              onAdd={handleFileAdd}
            />
          </div>
        )}
      </DialogContainer>

      
      {/* MUDANÇA: Usando uma div simples ou o nome alternativo (DialogAction) */}
      {/* SE ISTO FALHAR, USE A TAG <div> SIMPLES: <div> */}
      <DialogAction>
        <Button onClick={onClose} themeColor="secondary">
          CANCEL
        </Button>
        
        {!areTermsAccepted ? (
          <Button 
            onClick={() => setAreTermsAccepted(true)} 
            disabled={!isCheckboxChecked}
            themeColor="primary"
          >
            OK
          </Button>
        ) : (
          <Button 
            onClick={handleCloseUpload} 
            disabled={!uploadedFile} 
            themeColor="primary"
          >
            CLOSE
          </Button>
        )}
      </DialogAction>
      
    </Dialog>
  );
};

export default FontUploadFlowDialog;