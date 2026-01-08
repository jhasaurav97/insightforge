
const AuthLayout = ({title, subtitle, children}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-black dark:text-white">
          <div className="w-full max-w-md p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <h1 className="text-2xl font-semibold text-center mb-1">{title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                  {subtitle}
              </p>
              {children}
      </div>
    </div>
  )
}

export default AuthLayout;
