import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save, TrendingUp, TrendingDown } from 'lucide-react';

const ModalMovimentacao = ({ isOpen, onClose, onSave, itens }) => {
  const [formData, setFormData] = useState({
    vacinaSerumId: '',
    tipo: 'entrada',
    quantidade: 0,
    data: new Date().toISOString().split('T')[0],
    responsavel: '',
    observacoes: '',
    lote: ''
  });

  const [errors, setErrors] = useState({});
  const [itemSelecionado, setItemSelecionado] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        vacinaSerumId: '',
        tipo: 'entrada',
        quantidade: 0,
        data: new Date().toISOString().split('T')[0],
        responsavel: '',
        observacoes: '',
        lote: ''
      });
      setErrors({});
      setItemSelecionado(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Quando selecionar um item, preencher o lote automaticamente
    if (name === 'vacinaSerumId') {
      const item = itens.find(i => i.id === value);
      setItemSelecionado(item);
      if (item) {
        setFormData(prev => ({
          ...prev,
          lote: item.lote
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.vacinaSerumId) {
      newErrors.vacinaSerumId = 'Selecione um item';
    }
    
    if (!formData.responsavel.trim()) {
      newErrors.responsavel = 'Responsável é obrigatório';
    }
    
    if (formData.quantidade <= 0) {
      newErrors.quantidade = 'Quantidade deve ser maior que zero';
    }

    // Validar se há estoque suficiente para saída
    if (formData.tipo === 'saida' && itemSelecionado) {
      if (formData.quantidade > itemSelecionado.quantidadeAtual) {
        newErrors.quantidade = `Estoque insuficiente. Disponível: ${itemSelecionado.quantidadeAtual}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const movimentacaoData = {
      ...formData,
      id: Date.now().toString()
    };

    onSave(movimentacaoData);
    onClose();
  };

  if (!isOpen) return null;

  const itensDisponiveis = itens.filter(item => item.quantidadeAtual > 0 || formData.tipo === 'entrada');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            {formData.tipo === 'entrada' ? (
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
            )}
            Nova Movimentação
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">Tipo de Movimentação *</Label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div>
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  name="data"
                  type="date"
                  value={formData.data}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="vacinaSerumId">Item *</Label>
                <select
                  id="vacinaSerumId"
                  name="vacinaSerumId"
                  value={formData.vacinaSerumId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.vacinaSerumId ? 'border-red-500' : ''}`}
                >
                  <option value="">Selecione um item...</option>
                  {itensDisponiveis.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome} - Lote: {item.lote} - Estoque: {item.quantidadeAtual}
                    </option>
                  ))}
                </select>
                {errors.vacinaSerumId && <p className="text-red-500 text-sm mt-1">{errors.vacinaSerumId}</p>}
              </div>

              <div>
                <Label htmlFor="quantidade">Quantidade *</Label>
                <Input
                  id="quantidade"
                  name="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={handleChange}
                  min="1"
                  className={errors.quantidade ? 'border-red-500' : ''}
                />
                {errors.quantidade && <p className="text-red-500 text-sm mt-1">{errors.quantidade}</p>}
              </div>

              <div>
                <Label htmlFor="lote">Lote</Label>
                <Input
                  id="lote"
                  name="lote"
                  value={formData.lote}
                  onChange={handleChange}
                  placeholder="Lote será preenchido automaticamente"
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="responsavel">Responsável *</Label>
                <Input
                  id="responsavel"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  placeholder="Nome do responsável pela movimentação"
                  className={errors.responsavel ? 'border-red-500' : ''}
                />
                {errors.responsavel && <p className="text-red-500 text-sm mt-1">{errors.responsavel}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Observações sobre a movimentação..."
              />
            </div>

            {itemSelecionado && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Informações do Item Selecionado:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-blue-700">Nome:</span> {itemSelecionado.nome}
                  </div>
                  <div>
                    <span className="text-blue-700">Lote:</span> {itemSelecionado.lote}
                  </div>
                  <div>
                    <span className="text-blue-700">Estoque Atual:</span> {itemSelecionado.quantidadeAtual}
                  </div>
                  <div>
                    <span className="text-blue-700">Validade:</span> {itemSelecionado.dataValidade || 'Não informada'}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Registrar Movimentação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModalMovimentacao;

