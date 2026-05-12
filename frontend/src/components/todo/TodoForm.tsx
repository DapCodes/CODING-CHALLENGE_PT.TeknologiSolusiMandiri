import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
} from 'antd';
import dayjs from 'dayjs';
import { Todo, Priority, CreateTodoDto, UpdateTodoDto } from '../../types';
import { useCategoryContext } from '../../context/CategoryContext';

const { TextArea } = Input;
const { Option } = Select;

interface TodoFormProps {
  open: boolean;
  todo?: Todo | null;
  onClose: () => void;
  onSubmit: (data: CreateTodoDto | UpdateTodoDto) => Promise<void>;
  loading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ open, todo, onClose, onSubmit, loading }) => {
  const [form] = Form.useForm();
  const { categories } = useCategoryContext();
  const isEdit = Boolean(todo);

  useEffect(() => {
    if (open) {
      if (todo) {
        form.setFieldsValue({
          title: todo.title,
          description: todo.description,
          category_id: todo.category_id,
          priority: todo.priority,
          due_date: todo.due_date ? dayjs(todo.due_date) : null,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ priority: 'medium' });
      }
    }
  }, [open, todo, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        due_date: values.due_date ? values.due_date.toISOString() : null,
      };
      await onSubmit(payload);
      onClose();
    } catch {
      // Validation errors are shown by Form
    }
  };

  const priorityOptions: { value: Priority; label: string }[] = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    <Modal
      title={
        <span className="neo-modal-title">
          {isEdit ? 'Edit Todo' : 'Create Todo'}
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
          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            className="neo-btn neo-btn-primary"
          >
            {isEdit ? 'Save Changes' : 'Create'}
          </Button>
        </Space>
      }
      destroyOnHidden
      width={520}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }} className="neo-form">
        <Form.Item
          name="title"
          label={<span className="neo-label">Title</span>}
          rules={[
            { required: true, message: 'Title is required' },
            { max: 255, message: 'Title must not exceed 255 characters' },
          ]}
        >
          <Input placeholder="Enter todo title" className="neo-input" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span className="neo-label">Description</span>}
        >
          <TextArea rows={3} placeholder="Enter description (optional)" className="neo-input" />
        </Form.Item>

        <Form.Item
          name="category_id"
          label={<span className="neo-label">Category</span>}
        >
          <Select placeholder="Select category" allowClear className="neo-select">
            {categories.map((c) => (
              <Option key={c.id} value={c.id}>
                <Space>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      border: '2px solid #000',
                      background: c.color,
                    }}
                  />
                  {c.name}
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label={<span className="neo-label">Priority</span>}
        >
          <Select placeholder="Select priority" className="neo-select">
            {priorityOptions.map((p) => (
              <Option key={p.value} value={p.value}>
                {p.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="due_date"
          label={<span className="neo-label">Due Date</span>}
        >
          <DatePicker
            className="neo-input"
            style={{ width: '100%' }}
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Select due date (optional)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
