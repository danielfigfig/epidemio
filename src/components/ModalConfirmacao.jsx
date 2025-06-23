import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, X } from 'lucide-react';

const ModalConfirmacao = ({ isOpen, onClose, onConfirm, title, message, item }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {title}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{message}</p>
            
            {item && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">{item.nome}</p>
                <p className="text-sm text-gray-600">Lote: {item.lote}</p>
                <p className="text-sm text-gray-600">Quantidade: {item.quantidadeAtual}</p>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirmar Exclusão
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModalConfirmacao;

