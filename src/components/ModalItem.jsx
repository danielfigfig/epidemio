import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save } from 'lucide-react';

const ModalItem = ({ isOpen, onClose, onSave, item = null, title }) => {
  const [formData, setFormData] = useState({
    nome: '',
    lote: '',
    quantidadeAnterior: 0,
    quantidadeAtual: 0,
    quantidadeReal: 0,
    recebidoNoMes: 0,
    dataValidade: '',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'ativo',
    observacoes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        nome: '',
        lote: '',
        quantidadeAnterior: 0,
        quantidadeAtual: 0,
        quantidadeReal: 0,
        recebidoNoMes: 0,
        dataValidade: '',
        ultimaConferencia: '',
        dataConferenciaQtdVencer: '',
        utilizado: 0,
        status: 'ativo',
        observacoes: ''
      });
    }
    setErrors({});
  }, [item, isOpen]);

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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.lote.trim()) {
      newErrors.lote = 'Lote é obrigatório';
    }
    
    if (formData.quantidadeAtual < 0) {
      newErrors.quantidadeAtual = 'Quantidade não pode ser negativa';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Determinar status automaticamente baseado na quantidade
    let status = 'ativo';
    if (formData.quantidadeAtual === 0) {
      status = 'sem_estoque';
    } else if (formData.quantidadeAtual <= 5) {
      status = 'baixo_estoque';
    }

    const itemData = {
      ...formData,
      status,
      id: item?.id || Date.now().toString()
    };

    onSave(itemData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome da Vacina/Soro *</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: SAB, SAC, SABEC..."
                  className={errors.nome ? 'border-red-500' : ''}
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div>
                <Label htmlFor="lote">Lote *</Label>
                <Input
                  id="lote"
                  name="lote"
                  value={formData.lote}
                  onChange={handleChange}
                  placeholder="Ex: L001, L002..."
                  className={errors.lote ? 'border-red-500' : ''}
                />
                {errors.lote && <p className="text-red-500 text-sm mt-1">{errors.lote}</p>}
              </div>

              <div>
                <Label htmlFor="quantidadeAnterior">Quantidade Anterior</Label>
                <Input
                  id="quantidadeAnterior"
                  name="quantidadeAnterior"
                  type="number"
                  value={formData.quantidadeAnterior}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="quantidadeAtual">Quantidade Atual *</Label>
                <Input
                  id="quantidadeAtual"
                  name="quantidadeAtual"
                  type="number"
                  value={formData.quantidadeAtual}
                  onChange={handleChange}
                  min="0"
                  className={errors.quantidadeAtual ? 'border-red-500' : ''}
                />
                {errors.quantidadeAtual && <p className="text-red-500 text-sm mt-1">{errors.quantidadeAtual}</p>}
              </div>

              <div>
                <Label htmlFor="quantidadeReal">Quantidade Real</Label>
                <Input
                  id="quantidadeReal"
                  name="quantidadeReal"
                  type="number"
                  value={formData.quantidadeReal}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="recebidoNoMes">Recebido no Mês</Label>
                <Input
                  id="recebidoNoMes"
                  name="recebidoNoMes"
                  type="number"
                  value={formData.recebidoNoMes}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="dataValidade">Data de Validade</Label>
                <Input
                  id="dataValidade"
                  name="dataValidade"
                  value={formData.dataValidade}
                  onChange={handleChange}
                  placeholder="MM/AA (ex: 04/26)"
                />
              </div>

              <div>
                <Label htmlFor="ultimaConferencia">Última Conferência</Label>
                <Input
                  id="ultimaConferencia"
                  name="ultimaConferencia"
                  value={formData.ultimaConferencia}
                  onChange={handleChange}
                  placeholder="DD/MM (ex: 03/06)"
                />
              </div>

              <div>
                <Label htmlFor="utilizado">Quantidade Utilizada</Label>
                <Input
                  id="utilizado"
                  name="utilizado"
                  type="number"
                  value={formData.utilizado}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ativo">Ativo</option>
                  <option value="vencendo">Vencendo</option>
                  <option value="vencido">Vencido</option>
                  <option value="baixo_estoque">Baixo Estoque</option>
                  <option value="sem_estoque">Sem Estoque</option>
                </select>
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
                placeholder="Observações adicionais..."
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModalItem;

