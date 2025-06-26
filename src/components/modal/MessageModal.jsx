import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const sendEmail = async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email sent:", payload);
      resolve({ success: true });
    }, 1000);
  });
};

const messageTypes = ["Request for Information", "To Purchase", "Other"];

const MessageModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    const payload = {
      to: "vendoremail@gmail.com",
      subject: data.title,
      type: data.type,
      body: data.message,
    };

    try {
      const res = await sendEmail(payload);
      if (res.success) {
        toast.success("Message sent successfully!");
        onClose();
        reset();
        navigate(`/ads/${id}`);
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the message.");
      console.error(error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative border border-pink-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-pink-600">Send Message</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-pink-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
          <select
            {...register("type", { required: true })}
            className="w-full px-3 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
          >
            <option value="">Select Message Type</option>
            {messageTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Message Title"
            {...register("title", { required: true })}
            className="w-full px-3 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
          />

          <textarea
            placeholder="Message Body"
            {...register("message", { required: true })}
            rows="4"
            className="w-full px-3 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;
