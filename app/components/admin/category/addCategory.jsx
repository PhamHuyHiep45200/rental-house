import { createCategory } from "@/service/admin/category";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import "@ant-design/v5-patch-for-react-19";

function AddUser({ open, refresh, closeAdd }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    await createCategory(e);
    refresh();
    onCloseAdd();
  };
  const onCloseAdd = () => {
    closeAdd();
    form.resetFields();
  };
  return (
    <Modal
      title="Tạo Thể Loại"
      open={open}
      onCancel={onCloseAdd}
      footer={false}
    >
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="Tên Thể Loại"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <div>
          <Button
            htmlType="submit"
            type="primary"
            className="w-full"
            size="large"
          >
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddUser;
