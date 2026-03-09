export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a] text-center max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4">Connexion</h1>
        <p className="text-gray-400 mb-6">L&apos;authentification Clerk sera configurée prochainement.</p>
        <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Accéder au dashboard
        </a>
      </div>
    </div>
  );
}
