import "./BusinessForm.scss";
import { useState } from "react";
import useToast from "../hooks/useToast";
import Toast from "./Toast";

function BusinessForm() {
  const { toast, showToast, hideToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showValidation, setShowValidation] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Details
    businessName: "",
    ownerName: "",
    email: "",
    contactNumber: "",
    businessType: "",
    businessAddress: "",
    gstin: "",
    websiteUrl: "",
    shortDescription: "",

    // Restaurant specific
    menuFile: null,
    operatingDays: [],
    openingTime: "",
    closingTime: "",
    posSystems: [],

    // Temple specific
    templeDataFile: null,
    activeDays: [],
    festivalDates: [],
    templeOpeningTime: "",
    templeClosingTime: "",
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      if (
        name === "operatingDays" ||
        name === "activeDays" ||
        name === "posSystems"
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      festivalDates: [...prev.festivalDates, date],
    }));
  };

  const removeFestivalDate = (index) => {
    setFormData((prev) => ({
      ...prev,
      festivalDates: prev.festivalDates.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    // Show validation errors when user tries to proceed
    setShowValidation(true);

    // Validation for step 1 - require all basic fields
    if (currentStep === 1) {
      if (
        !formData.businessName ||
        !formData.ownerName ||
        !formData.email ||
        !formData.contactNumber ||
        !formData.businessType ||
        !formData.businessAddress
      ) {
        showToast(
          "Please fill in all required fields before proceeding",
          "error"
        );
        return;
      }
    }

    // Validation for step 2 - require business-specific fields
    if (currentStep === 2) {
      if (formData.businessType === "Restaurant") {
        if (
          !formData.menuFile ||
          formData.operatingDays.length === 0 ||
          !formData.openingTime ||
          !formData.closingTime
        ) {
          showToast("Please fill in all required restaurant fields", "error");
          return;
        }
      } else if (formData.businessType === "Temple") {
        if (
          !formData.templeDataFile ||
          formData.activeDays.length === 0 ||
          !formData.templeOpeningTime ||
          !formData.templeClosingTime
        ) {
          showToast("Please fill in all required temple fields", "error");
          return;
        }
      }
    }

    // Step 3 is summary - no validation needed
    if (currentStep === 3) {
      // Allow proceeding to final submit step
    }

    // If validation passes, proceed to next step
    setShowValidation(false);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setShowValidation(false);
      setCurrentStep(currentStep - 1);
    }
  };

  // Helper function to check if a field is empty and should show error
  const isFieldEmpty = (fieldName) => {
    const value = formData[fieldName];
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    // Handle file objects
    if (value instanceof File) {
      return !value;
    }
    // Handle string values
    if (typeof value === "string") {
      return !value || value.trim() === "";
    }
    // Handle other types (null, undefined, etc.)
    return !value;
  };

  // Helper function to get CSS class for field validation
  const getFieldClass = (fieldName) => {
    const baseClass = "business-form-section__form-group";
    if (!showValidation) return baseClass;

    if (currentStep === 1 && isFieldEmpty(fieldName)) {
      return `${baseClass} business-form-section__form-group--error`;
    }
    if (currentStep === 2) {
      if (formData.businessType === "Restaurant") {
        if (
          ["menuFile", "operatingDays", "openingTime", "closingTime"].includes(
            fieldName
          ) &&
          isFieldEmpty(fieldName)
        ) {
          return `${baseClass} business-form-section__form-group--error`;
        }
      } else if (formData.businessType === "Temple") {
        if (
          [
            "templeDataFile",
            "activeDays",
            "templeOpeningTime",
            "templeClosingTime",
          ].includes(fieldName) &&
          isFieldEmpty(fieldName)
        ) {
          return `${baseClass} business-form-section__form-group--error`;
        }
      }
    }
    return baseClass;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you would typically send the data to your backend
      console.log("Form data:", formData);

      showToast("Business information submitted successfully!", "success");

      // Reset form
      setFormData({
        businessName: "",
        ownerName: "",
        email: "",
        contactNumber: "",
        businessType: "",
        businessAddress: "",
        gstin: "",
        websiteUrl: "",
        shortDescription: "",
        menuFile: null,
        operatingDays: [],
        openingTime: "",
        closingTime: "",
        posSystems: [],
        templeDataFile: null,
        activeDays: [],
        festivalDates: [],
        templeOpeningTime: "",
        templeClosingTime: "",
      });
      setCurrentStep(1);
      setShowValidation(false);
    } catch (error) {
      showToast("Error submitting form. Please try again.", "error");
    }
  };

  const renderStepInfo = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Basic Business Information",
          description:
            "We need your basic business details to understand your organization and set up your profile correctly.",
          benefits: [
            "Helps us personalize your experience",
            "Enables proper business categorization",
            "Facilitates accurate service recommendations",
            "Ensures compliance with local regulations",
          ],
        };
      case 2:
        return {
          title:
            formData.businessType === "Restaurant"
              ? "Restaurant Details"
              : "Temple Details",
          description:
            formData.businessType === "Restaurant"
              ? "Restaurant-specific information helps us optimize your operations and customer experience."
              : "Temple-specific information helps us manage events, ceremonies, and visitor services effectively.",
          benefits:
            formData.businessType === "Restaurant"
              ? [
                  "Optimize menu management and pricing",
                  "Streamline order processing",
                  "Improve customer service efficiency",
                  "Enhance POS integration capabilities",
                ]
              : [
                  "Manage events and ceremonies effectively",
                  "Track visitor patterns and preferences",
                  "Optimize resource allocation",
                  "Improve community engagement",
                ],
        };
      case 3:
        return {
          title: "Review Your Information",
          description:
            "Please review all the information you've provided. You can go back to edit any details before final submission.",
          benefits: [
            "Review all entered data",
            "Verify information accuracy",
            "Make final corrections",
            "Ensure complete information",
          ],
        };
      case 4:
        return {
          title: "Final Submission",
          description:
            "Ready to submit your business registration. Please confirm all information is correct.",
          benefits: [
            "Final confirmation step",
            "Data integrity check",
            "Submission preparation",
            "Process completion",
          ],
        };
      default:
        return { title: "", description: "", benefits: [] };
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="business-form-section__step-content">
            <div className="business-form-section__form-row">
              <div className={getFieldClass("businessName")}>
                <label>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter your business name"
                />
              </div>
              <div className={getFieldClass("ownerName")}>
                <label>Owner / Contact Person *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner/contact name"
                />
              </div>
            </div>

            <div className="business-form-section__form-row">
              <div className={getFieldClass("email")}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>
              <div className={getFieldClass("contactNumber")}>
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            <div className={getFieldClass("businessType")}>
              <label>Business Type *</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
              >
                <option value="">Select business type</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Temple">Temple</option>
              </select>
            </div>

            <div className={getFieldClass("businessAddress")}>
              <label>Business Address *</label>
              <textarea
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                placeholder="Enter complete business address"
                rows={3}
              ></textarea>
            </div>

            <div className="business-form-section__form-row">
              <div className="business-form-section__form-group">
                <label>GSTIN / Tax ID</label>
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  placeholder="Enter GSTIN or Tax ID"
                />
              </div>
              <div className="business-form-section__form-group">
                <label>Website URL</label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="Enter website URL"
                />
              </div>
            </div>

            <div className="business-form-section__form-group">
              <label>Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief description of your business"
                rows={3}
              ></textarea>
            </div>
          </div>
        );

      case 2:
        if (formData.businessType === "Restaurant") {
          return (
            <div className="business-form-section__step-content">
              <div className={getFieldClass("menuFile")}>
                <label>Upload Menu *</label>
                <input
                  type="file"
                  name="menuFile"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <small>Accepted formats: PDF, JPG, PNG</small>
              </div>

              <div className={getFieldClass("operatingDays")}>
                <label>Operating Days *</label>
                <div className="business-form-section__checkbox-group">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <label
                      key={day}
                      className="business-form-section__checkbox-item"
                    >
                      <input
                        type="checkbox"
                        name="operatingDays"
                        value={day}
                        checked={formData.operatingDays.includes(day)}
                        onChange={handleChange}
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="business-form-section__form-row">
                <div className={getFieldClass("openingTime")}>
                  <label>Opening Time *</label>
                  <input
                    type="time"
                    name="openingTime"
                    value={formData.openingTime}
                    onChange={handleChange}
                  />
                </div>
                <div className={getFieldClass("closingTime")}>
                  <label>Closing Time *</label>
                  <input
                    type="time"
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="business-form-section__form-group">
                <label>POS System</label>
                <div className="business-form-section__checkbox-group">
                  <label className="business-form-section__checkbox-item">
                    <input
                      type="checkbox"
                      name="posSystems"
                      value="Square"
                      checked={formData.posSystems.includes("Square")}
                      onChange={handleChange}
                    />
                    <span>Square</span>
                  </label>
                  <label className="business-form-section__checkbox-item">
                    <input
                      type="checkbox"
                      name="posSystems"
                      value="Clover"
                      checked={formData.posSystems.includes("Clover")}
                      onChange={handleChange}
                    />
                    <span>Clover</span>
                  </label>
                </div>
              </div>
            </div>
          );
        } else if (formData.businessType === "Temple") {
          return (
            <div className="business-form-section__step-content">
              <div className={getFieldClass("templeDataFile")}>
                <label>Upload Temple Data *</label>
                <input
                  type="file"
                  name="templeDataFile"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <small>Accepted formats: PDF, JPG, PNG</small>
              </div>

              <div className={getFieldClass("activeDays")}>
                <label>Active Days / Special Dates *</label>
                <div className="business-form-section__checkbox-group">
                  <label className="business-form-section__checkbox-item">
                    <input
                      type="checkbox"
                      name="activeDays"
                      value="Daily"
                      checked={formData.activeDays.includes("Daily")}
                      onChange={handleChange}
                    />
                    <span>Daily</span>
                  </label>
                  <label className="business-form-section__checkbox-item">
                    <input
                      type="checkbox"
                      name="activeDays"
                      value="Weekly"
                      checked={formData.activeDays.includes("Weekly")}
                      onChange={handleChange}
                    />
                    <span>Weekly</span>
                  </label>
                </div>
              </div>

              <div className="business-form-section__form-group">
                <label>Festival Dates</label>
                <div className="business-form-section__date-input">
                  <input
                    type="date"
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                  <button
                    type="button"
                    className="business-form-section__add-date-btn"
                    onClick={() => {
                      const dateInput =
                        document.querySelector('input[type="date"]');
                      if (dateInput.value) {
                        handleDateChange(dateInput.value);
                        dateInput.value = "";
                      }
                    }}
                  >
                    Add Date
                  </button>
                </div>
                {formData.festivalDates.length > 0 && (
                  <div className="business-form-section__date-list">
                    {formData.festivalDates.map((date, index) => (
                      <div
                        key={index}
                        className="business-form-section__date-item"
                      >
                        <span>{new Date(date).toLocaleDateString()}</span>
                        <button
                          type="button"
                          onClick={() => removeFestivalDate(index)}
                          className="business-form-section__remove-date-btn"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="business-form-section__form-row">
                <div className={getFieldClass("templeOpeningTime")}>
                  <label>Opening Time *</label>
                  <input
                    type="time"
                    name="templeOpeningTime"
                    value={formData.templeOpeningTime}
                    onChange={handleChange}
                  />
                </div>
                <div className={getFieldClass("templeClosingTime")}>
                  <label>Closing Time *</label>
                  <input
                    type="time"
                    name="templeClosingTime"
                    value={formData.templeClosingTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          );
        }
        return null;

      case 3:
        return (
          <div className="business-form-section__step-content">
            <div className="business-form-section__review">
              <h3>Review Your Information</h3>

              <div className="business-form-section__review-section">
                <h4>Basic Details</h4>
                <div className="business-form-section__review-item">
                  <strong>Business Name:</strong> {formData.businessName}
                </div>
                <div className="business-form-section__review-item">
                  <strong>Owner:</strong> {formData.ownerName}
                </div>
                <div className="business-form-section__review-item">
                  <strong>Email:</strong> {formData.email}
                </div>
                <div className="business-form-section__review-item">
                  <strong>Contact:</strong> {formData.contactNumber}
                </div>
                <div className="business-form-section__review-item">
                  <strong>Business Type:</strong> {formData.businessType}
                </div>
                <div className="business-form-section__review-item">
                  <strong>Address:</strong> {formData.businessAddress}
                </div>
                {formData.gstin && (
                  <div className="business-form-section__review-item">
                    <strong>GSTIN:</strong> {formData.gstin}
                  </div>
                )}
                {formData.websiteUrl && (
                  <div className="business-form-section__review-item">
                    <strong>Website:</strong> {formData.websiteUrl}
                  </div>
                )}
                {formData.shortDescription && (
                  <div className="business-form-section__review-item">
                    <strong>Description:</strong> {formData.shortDescription}
                  </div>
                )}
              </div>

              {formData.businessType === "Restaurant" && (
                <div className="business-form-section__review-section">
                  <h4>Restaurant Details</h4>
                  <div className="business-form-section__review-item">
                    <strong>Menu File:</strong>{" "}
                    {formData.menuFile
                      ? formData.menuFile.name
                      : "Not uploaded"}
                  </div>
                  <div className="business-form-section__review-item">
                    <strong>Operating Days:</strong>{" "}
                    {formData.operatingDays.join(", ")}
                  </div>
                  <div className="business-form-section__review-item">
                    <strong>Hours:</strong> {formData.openingTime} -{" "}
                    {formData.closingTime}
                  </div>
                  {formData.posSystems.length > 0 && (
                    <div className="business-form-section__review-item">
                      <strong>POS Systems:</strong>{" "}
                      {formData.posSystems.join(", ")}
                    </div>
                  )}
                </div>
              )}

              {formData.businessType === "Temple" && (
                <div className="business-form-section__review-section">
                  <h4>Temple Details</h4>
                  <div className="business-form-section__review-item">
                    <strong>Temple Data File:</strong>{" "}
                    {formData.templeDataFile
                      ? formData.templeDataFile.name
                      : "Not uploaded"}
                  </div>
                  <div className="business-form-section__review-item">
                    <strong>Active Days:</strong>{" "}
                    {formData.activeDays.join(", ")}
                  </div>
                  <div className="business-form-section__review-item">
                    <strong>Hours:</strong> {formData.templeOpeningTime} -{" "}
                    {formData.templeClosingTime}
                  </div>
                  {formData.festivalDates.length > 0 && (
                    <div className="business-form-section__review-item">
                      <strong>Festival Dates:</strong>{" "}
                      {formData.festivalDates
                        .map((date) => new Date(date).toLocaleDateString())
                        .join(", ")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="business-form-section__step-content">
            <div className="business-form-section__final-submission">
              <div className="business-form-section__final-header">
                <h3>Ready to Submit</h3>
                <p>
                  Please confirm that all your information is correct before
                  submitting.
                </p>
              </div>

              <div className="business-form-section__confirmation-section">
                <h4>Final Confirmation</h4>
                <div className="business-form-section__confirmation-item">
                  <span className="business-form-section__confirmation-icon">
                    ✓
                  </span>
                  <span>All required information has been provided</span>
                </div>
                <div className="business-form-section__confirmation-item">
                  <span className="business-form-section__confirmation-icon">
                    ✓
                  </span>
                  <span>Business details have been verified</span>
                </div>
                <div className="business-form-section__confirmation-item">
                  <span className="business-form-section__confirmation-icon">
                    ✓
                  </span>
                  <span>Files have been uploaded successfully</span>
                </div>
                <div className="business-form-section__confirmation-item">
                  <span className="business-form-section__confirmation-icon">
                    ✓
                  </span>
                  <span>Operating hours and schedules are confirmed</span>
                </div>
              </div>

              <div className="business-form-section__submit-notice">
                <h4>What happens next?</h4>
                <ul>
                  <li>Your business registration will be processed</li>
                  <li>You'll receive a confirmation email</li>
                  <li>Our team will review your information</li>
                  <li>You'll be contacted within 24-48 hours</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="business-form-section">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <h2 className="business-form-section__title">
        Business{" "}
        <span className="business-form-section__title--accent">
          Registration
        </span>
      </h2>
      <p className="business-form-section__subtitle">
        Complete your business profile to get started with our services.
      </p>

      <div className="business-form-section__divider" />

      <div className="business-form-section__content">
        <div className="business-form-section__info">
          <div className="business-form-section__info-block">
            <div className="business-form-section__info-title">
              {renderStepInfo().title}
            </div>
            <div className="business-form-section__info-description">
              {renderStepInfo().description}
            </div>
            <div className="business-form-section__info-benefits">
              <h4>Why this information is required:</h4>
              <ul>
                {renderStepInfo().benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="business-form-section__progress-card">
            <div className="business-form-section__progress-title">
              Progress
            </div>
            <div className="business-form-section__progress-bar">
              <div
                className="business-form-section__progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="business-form-section__progress-text">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>

        <form className="business-form-section__form" onSubmit={handleSubmit}>
          <div className="business-form-section__form-header">
            <div className="business-form-section__form-title">
              Step {currentStep}: {renderStepInfo().title}
            </div>
            <div className="business-form-section__form-subtitle">
              {currentStep === 1 &&
                "Please provide your basic business information"}
              {currentStep === 2 &&
                `Please provide your ${formData.businessType.toLowerCase()} details`}
              {currentStep === 3 &&
                "Review all your information before proceeding"}
              {currentStep === 4 &&
                "Confirm and submit your business registration"}
            </div>
          </div>

          {renderStepContent()}

          <div className="business-form-section__form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="business-form-section__btn business-form-section__btn--secondary"
                onClick={prevStep}
              >
                Previous
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="button"
                className="business-form-section__btn business-form-section__btn--secondary"
                onClick={() => setCurrentStep(1)}
              >
                Edit Information
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                className="business-form-section__btn business-form-section__btn--primary"
                onClick={nextStep}
              >
                {currentStep === 3 ? "Proceed to Submit" : "Next"}
              </button>
            ) : (
              <button
                type="submit"
                className="business-form-section__btn business-form-section__btn--primary"
              >
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default BusinessForm;
