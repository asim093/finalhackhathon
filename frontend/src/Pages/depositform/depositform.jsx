import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";

const DepositForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [loanBreakdown, setLoanBreakdown] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    cnic: "",
    email: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://competent-bennie-asim-c9637f51.koyeb.app/category/getcategory"
        );
        const data = await response.json();
        setCategories(data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategoryData = categories.find(
      (cat) => cat._id === selectedCategory
    );

    if (!selectedCategoryData) {
      alert("Please select a valid category.");
      return;
    }

    const maxLoan =
      parseFloat(selectedCategoryData.maximumloan.replace(" Lakh", "")) *
      100000; // Convert "10 Lakh" to 1000000
    const deposit = parseFloat(depositAmount);
    const period = parseInt(loanPeriod);

    if (!deposit || !period || isNaN(deposit) || isNaN(period)) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (deposit > maxLoan) {
      alert("Deposit amount cannot exceed the maximum loan amount.");
      return;
    }

    // Calculate remaining loan
    const remainingLoan = maxLoan - deposit;

    // Calculate monthly installment based on remaining loan divided by the loan period in months (period * 12)
    const monthlyInstallment = remainingLoan / (period * 12); // Remaining loan divided by months

    setLoanBreakdown({
      category: selectedCategoryData.name,
      maxLoan,
      deposit,
      remainingLoan,
      monthlyInstallment,
    });
  };

  const handleProceedClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();

    const loanData = {
      ...formData,
      category: selectedCategory,
      depositAmount: parseFloat(depositAmount), // Ensure it's a number
      loanPeriod: parseInt(loanPeriod, 10), // Ensure it's a number
    };

    try {
      setIsSubmitting(true);
      console.log(loanData);

      const response = await fetch(
        "https://competent-bennie-asim-c9637f51.koyeb.app/loan/createloan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loanData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Loan created successfully!");
        setFormData({ cnic: "", email: "", name: "" }); // Reset the form fields
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting loan data:", error);
      alert("Error submitting loan data.");
    } finally {
      setIsPopupOpen(false); // Close the popup after submission
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Loan Calculator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-lg font-medium">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="deposit" className="block text-lg font-medium">
              Initial Deposit
            </label>
            <input
              type="number"
              id="deposit"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border p-2 rounded-md w-full"
              placeholder="Enter initial deposit"
            />
          </div>

          <div>
            <label htmlFor="loanPeriod" className="block text-lg font-medium">
              Loan Period (years)
            </label>
            <select
              id="loanPeriod"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Loan Period</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md w-full hover:bg-blue-600"
            >
              Calculate Loan Breakdown
            </button>
          </div>
        </form>

        {loanBreakdown && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Loan Breakdown</h3>
            <p>
              <strong>Category:</strong> {loanBreakdown.category}
            </p>
            <p>
              <strong>Maximum Loan:</strong> PKR{" "}
              {loanBreakdown.maxLoan.toLocaleString()}
            </p>
            <p>
              <strong>Deposit Amount:</strong> PKR{" "}
              {loanBreakdown.deposit.toLocaleString()}
            </p>
            <p>
              <strong>Remaining Loan:</strong> PKR{" "}
              {loanBreakdown.remainingLoan.toLocaleString()}
            </p>
            <p>
              <strong>Monthly Installment:</strong> PKR{" "}
              {loanBreakdown.monthlyInstallment.toLocaleString()}
            </p>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleProceedClick}
            className="bg-green-500 text-white px-6 py-2 rounded-md w-full hover:bg-green-600"
          >
            Proceed with Loan
          </button>
        </div>

        {/* Popup form */}
        {isPopupOpen && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
            onClick={handlePopupClose}
          >
            <div
              className="bg-white p-6 rounded-md w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
              <form onSubmit={handlePopupSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="cnic"
                    className="block text-lg font-medium mb-2"
                  >
                    CNIC
                  </label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md w-full hover:bg-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Loan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositForm;
