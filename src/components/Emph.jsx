// Renders "text {emphasised} text" with the braced part in the italic accent style.
const Emph = ({ text }) =>
  text.split(/(\{[^}]+\})/).map((part, i) =>
    part.startsWith('{') ? (
      <em key={i} className="accent">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    )
  );

export default Emph;
