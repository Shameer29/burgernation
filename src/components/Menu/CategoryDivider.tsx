export default function CategoryDivider() {
  return (
    <div className="goo my-4 flex h-4 items-center gap-2.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-crush animate-float"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  );
}
