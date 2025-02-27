import { updateCategory } from "@/service/admin/category";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";

function UpdateUser({ open, refresh, closeAdd, data }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    try {
      await updateCategory(data.id, e);
      refresh();
      onCloseAdd();
    } catch (error) {
      console.log(error);
    }
  };
  const onCloseAdd = () => {
    closeAdd();
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        image: data.image,
      });
    }
  }, [data]);
  return (
    <Modal
      title="Sửa Thể Loại"
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
          <Button htmlType="submit" className="w-full" size="large">
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateUser;
