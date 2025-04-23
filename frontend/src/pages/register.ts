export function registerPage(): string {
    return `
      <div class="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black text-white">
        <div class="w-full max-w-md bg-gray-800 p-8 shadow-lg rounded-lg border border-blue-500">
          <h1 class="text-3xl font-extrabold text-center text-blue-400 drop-shadow-lg">Build Your Player Profile!</h1>
  
          <form id="registerForm" class="mt-6">
            <div class="mb-4">
              <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" placeholder="Enter your email"
                class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
  
            <div class="mb-4">
              <label for="password" class="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input type="password" id="password" placeholder="Enter your password"
                class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
  
            <div class="mb-4">
              <label for="confirmPassword" class="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Re-enter your password"
                class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <p id="error-message" class="text-red-500 text-sm mt-1 hidden">Passwords do not match</p>
            </div>
  
            <button type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition transform hover:scale-105 duration-300">
              Join the Battle
            </button>

            <div class="mt-4 text-center">
              <button onclick="window.location.href='http://localhost:3000/auth/google'"
                class="bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                🔐 Continue with Google
              </button>
            </div>

          </form>
  
          <p class="text-sm text-center text-gray-400 mt-4">
            Already a warrior?
            <a href="/login" onclick="event.preventDefault(); window.route('/login')" class="text-blue-400 hover:underline">Enter the Arena</a>
          </p>
        </div>
      </div>
    `;
  }
  