import React, { useEffect } from 'react';
import { Modal, Form, Input, ColorPicker, Button, Space } from 'antd';
import { Category } from '../../types';
import { useCategoryContext } from '../../context/CategoryContext';

interface CategoryFormProps {
  open: boolean;
  category?: Category | null;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ open, category, onClose }) => {
  const [form] = Form.useForm();
  const { createCategory, updateCategory } = useCategoryContext();
  const isEdit = Boolean(category);

  useEffect(() => {
    if (open) {
      if (category) {
        form.setFieldsValue({ name: category.name, color: category.color });
      } else {
        form.resetFields();
        form.setFieldsValue({ color: '#6366F1' });
      }
    }
  }, [open, category, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const color =
        typeof values.color === 'string'
          ? values.color
          : values.color?.toHexString?.() ?? '#6366F1';

      if (isEdit && category) {
        await updateCategory(category.id, { name: values.name, color });
      } else {
        await createCategory({ name: values.name, color });
      }
      onClose();
    } catch {
      // validation handled by Form
    }
  };

  return (
    <Modal
      title={
        <span className="neo-modal-title">
          {isEdit ? 'Edit Category' : 'Create Category'}
        </span>
      }
      open={open}
      onCancel={onClose}
      className="neo-modal"
      footer={
        <Space size="middle" style={{ marginTop: 12 }}>
          <Button onClick={onClose} className="neo-btn neo-btn-outline">
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit} className="neo-btn neo-btn-primary">
            {isEdit ? 'Save Changes' : 'Create'}
          </Button>
        </Space>
      }
      destroyOnHidden
      width={480}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }} className="neo-form">
        <Form.Item
          name="name"
          label={<span className="neo-label">Name</span>}
          rules={[
            { required: true, message: 'Name is required' },
            { max: 100, message: 'Name must not exceed 100 characters' },
          ]}
        >
          <Input placeholder="e.g. Work, Personal, Shopping" className="neo-input" />
        </Form.Item>

        <Form.Item
          name="color"
          label={<span className="neo-label">Color</span>}
        >
          <ColorPicker format="hex" showText />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
