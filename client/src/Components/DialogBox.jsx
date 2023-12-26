// eslint-disable-next-line react/prop-types
function DialogBox({ user, onConfirmDelete, onCancel }) {
  return (
    <div className="bg-white rounded-lg md:max-w-md border mx-auto p-4 z-50">
      <div className="md:flex items-center">
        <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
          <i className="bx bx-error text-3xl"></i>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold">Delete your account</p>
          <p className="text-sm text-gray-700 mt-1">
            You will lose all of your data by deleting your account. This action
            cannot be undone.
          </p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          onClick={() => onConfirmDelete(user)}
        >
          Delete Account
        </button>
        <button
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DialogBox;
