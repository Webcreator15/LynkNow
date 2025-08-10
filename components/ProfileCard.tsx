type Props = {
  name: string;
  age: number;
  city: string;
  img: string;
  bio: string;
};

export default function ProfileCard({ name, age, city, img, bio }: Props) {
  return (
    <article className="profile-card bg-white rounded-xl overflow-hidden">
      <div className="relative">
        <img src={img} alt={`${name} — photo de profil`} className="w-full h-64 object-cover" />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg">{name}, {age}</h3>
          <p className="text-white/90 text-sm">{city}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-4">{bio}</p>
        <div className="flex justify-between" aria-label="Actions">
          <button className="bg-red-100 text-[var(--lynk-red)] p-2 rounded-full hover:bg-red-200" onClick={(e)=> (e.currentTarget.closest('.profile-card') as HTMLElement)?.remove()} title="Passer">✕</button>
          <button className="bg-[var(--lynk-red)] text-white p-2 rounded-full hover:bg-red-600" title="Aimer">❤</button>
        </div>
      </div>
    </article>
  );
}
