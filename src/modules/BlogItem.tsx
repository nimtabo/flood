type BlogItemProps = {
  item: any;
};

export default function BlogItem({ item }: BlogItemProps) {
  const replaceEntityName = (str: string) => {
    return str
      .replace(/&lt;/g, "&#60;") //less than sign
      .replace(/&gt;/g, "&#62;") //greater than sign
      .replace(/&amp;/g, "&#38;") //& sign
      .replace(/&quot;/g, "&#34;") // " sign
      .replace(/&apos;/g, "&#39;") // " sign
      .replace(/(&#(\d+);)/g, (match, capture, charCode) =>
        String.fromCharCode(charCode)
      );
  };
  return (
    <div className="border rounded-3 bg-white p-3 col-12 col-lg-6 my-2">
      <p className="mb-2 fw-bold">{item.title}</p>
      <p
        className="mb-1 ms-2"
        dangerouslySetInnerHTML={{ __html: replaceEntityName(item.body) }}
      ></p>
      <p className="my-0 text-muted">
        <small>
          {new Date(item.createdAt).toLocaleString("en-us", {
            dateStyle: "medium",
          })}
        </small>
      </p>
    </div>
  );
}
