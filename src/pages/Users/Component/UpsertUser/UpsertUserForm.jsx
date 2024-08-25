import { Button, Checkbox, Form, Input, Select } from "antd";
import { useEffect } from "react";

export const UpsertUserForm = ({
  form,
  formData,
  filteredLocations,
  setFilteredLocations,
  handleChange,
  onFinish,
  setFormData,
  countries,
  regionsLookup,
  locationLookup,
  rolesLookup,
  interestLookup,
  TitlesLookup,
  isEditing,
}) => {
  useEffect(() => {
    if (form.getFieldValue("regionId")) {
      setLocations(form.getFieldValue("regionId"));
    }
  }, [form.getFieldValue("regionId")]);

  const setLocations = (value) => {
    const finterLocation = locationLookup.filter(
      (location) => location.regionId === value
    );
    setFilteredLocations(finterLocation);
  };

  return (
    <Form
      form={form}
      className="p-3"
      name="upsertUserForm"
      initialValues={formData}
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <h2 className="text-start mb-2">
        {isEditing ? "Edit Profile" : "Create a new user"}
      </h2>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Form.Item
            label="First Name:"
            className="form-label"
            name="firstName"
            rules={[
              { required: true, message: "Please enter first name" },
              {
                min: 3,
                max: 100,
                message:
                  "First name must be between 3 and 100 characters long.",
              },
              {
                pattern: /^[a-zA-Z\s-']*$/,
                message: "Special characters are not allowed.",
              },
            ]}
          >
            <Input
              className="form-control "
              name="firstName"
              style={{ marginTop: "-5px" }}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Last Name:"
            className="form-label"
            name="lastName"
            rules={[
              { required: true, message: "Please enter last name" },
              {
                min: 3,
                max: 100,
                message: "Last name must be between 3 and 100 characters long.",
              },
              {
                pattern: /^[a-zA-Z\s-']*$/,
                message: "Special characters are not allowed.",
              },
            ]}
          >
            <Input
              className="form-control"
              name="lastName"
              style={{ marginTop: "-5px" }}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Middle Name:"
            className="form-label"
            name="middleName"
          >
            <Input
              name="middleName"
              className="form-control"
              style={{ marginTop: "-5px" }}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Display Name:"
            className="form-label"
            name="name"
            rules={[
              { required: true, message: "Please enter display name" },
              {
                min: 3,
                max: 100,
                message:
                  "Display name must be between 3 and 100 characters long.",
              },
              {
                pattern: /^[a-zA-Z\s-']*$/,
                message: "Special characters are not allowed.",
              },
            ]}
          >
            <Input
              name="name"
              className="form-control "
              style={{ marginTop: "-5px" }}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Nationality:"
            className="form-label"
            name="nationality"
          >
            <Select
              className="form-select p-0"
              style={{ marginTop: "-5px" }}
              onChange={(value) => {
                setFormData({ ...formData, nationality: value });
              }}
            >
              {countries.map((country) => (
                <Select.Option key={country.value} value={country.label}>
                  {country.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Gender:"
            className="form-label"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select
              className="form-select p-0"
              style={{ marginTop: "-5px" }}
              onChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Marital Status:"
            className="form-label"
            name="maritalStatus"
          >
            <Select
              className="form-select p-0"
              style={{ marginTop: "-5px" }}
              onChange={(value) =>
                setFormData({ ...formData, maritalStatus: value })
              }
            >
              <Select.Option value="single">Single</Select.Option>
              <Select.Option value="married">Married</Select.Option>
              <Select.Option value="divorced">Divorced</Select.Option>
              <Select.Option value="widowed">Widowed</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Email:"
            className="form-label"
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              name="email"
              className="form-control "
              style={{ marginTop: "-5px" }}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Phone:"
            className="form-label"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number",
              },
              {
                len: 10,
                message: "Phone number must be exactly 10 digits",
              },
              {
                pattern: /^\d+$/,
                message: "Phone number must only contain digits",
              },
            ]}
          >
            <Input
              name="phoneNumber"
              type="tel"
              className="form-control "
              style={{ marginTop: "-5px" }}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Region:"
            className="form-label"
            name="regionId"
            rules={[{ required: true, message: "Please enter region" }]}
          >
            <Select
              className="form-select p-0"
              style={{ marginTop: "-5px" }}
              value={regionsLookup}
              onChange={(value) => {
                form.setFieldValue("locationId", null);
                setLocations(value);
              }}
            >
              {regionsLookup &&
                regionsLookup.map((region) => (
                  <Select.Option key={region.id} value={region.id}>
                    {region.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Location:"
            className="form-label"
            name="locationId"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Select
              className="form-select p-0"
              style={{ marginTop: "-5px" }}
              value={locationLookup}
            >
              {filteredLocations &&
                filteredLocations.map((location) => (
                  <Select.Option key={location.id} value={location.id}>
                    {location.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Title:"
            className="form-label"
            name="titleId"
            rules={[{ required: true, message: "Please select title" }]}
          >
            <Select
              className="form-select p-0"
              style={{ marginTop: "-5px" }}
              value={TitlesLookup}
            >
              {TitlesLookup &&
                TitlesLookup.map((Title) => (
                  <Select.Option key={Title.id} value={Title.id}>
                    {Title.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Form.Item label="Role:" className="form-label" name="roleId">
            <Select
              className=""
              onChange={(checkedValues) => {
                setFormData({ ...formData, role: checkedValues });
              }}
            >
              {rolesLookup &&
                rolesLookup.map((Role) => (
                  <Select.Option key={Role.id} value={Role.id}>
                    {Role.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-md-6 mb-2">
          <Form.Item
            label="Report To:"
            className="form-label"
            name="title"
            rules={[{ required: true, message: "Please select your manager" }]}
          >
            {/* <Select
              className="form-select p-0"
              style={{ marginTop: "-5px" }}
              value={TitlesLookup}
              onChange={(value) => {
                const selectedTitle = TitlesLookup.find(
                  (r) => r.name === value
                );
                if (selectedTitle) {
                  value;
                  setFormData({ ...formData, title: value });
                }
              }}
            >
              {TitlesLookup &&
                TitlesLookup.map((Title) => (
                  <Select.Option key={Title.id} value={Title.name}>
                    {Title.name}
                  </Select.Option>
                ))}
            </Select> */}
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="mb-2">
          <Form.Item
            label="Interests:"
            className="form-label"
            name="interests"
            rules={[{ required: true, message: "Please select interests" }]}
          >
            <Checkbox.Group
              className="form-checkbox-group"
            >
              <div className="checkbox-group-vertical">
                {interestLookup &&
                  interestLookup.map((interest, index) => (
                    <Checkbox key={interest.id} value={interest.id}>
                      {interest.name}
                    </Checkbox>
                  ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        </div>
      </div>
      <div className="pt-3">
        <Button type="primary" htmlType="submit" className="btn btn-primary">
          {isEditing ? "Save Changes" : "Create"}
        </Button>
      </div>
    </Form>
  );
};
