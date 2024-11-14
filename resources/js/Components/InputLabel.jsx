export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <div className="flex justify-between">
            <label
                className={
                    `text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400` +
                    className
                }
            >
                {/* {...props} */}
                {value ? value : children}
            </label>
        </div>
    );
}
