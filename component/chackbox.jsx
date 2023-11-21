export default function Checked() {
  return (
    <div className="flex items-center">
      <input
        id="link-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        required
      ></input>
      <label
        htmlFor="link-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Saya setuju{" "}
        <a
          href="#"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          memberikan data saya untuk keperluan informasi mengenai kegiatan
          pemilu 2024.
        </a>
        .
      </label>
    </div>
  );
}
