export default function SidebarMenuGroup(props: any) {
    return props.titles.map((title: string, index: number) => {
        console.log(title, index, props.activeDefault[index]);
        return (
            <div
                key={index}
                className={`sidebar-group ${
                    props.activeDefault[index] ? "active-default" : ""
                }`}
            >
                <div className="title">{title}</div>
            </div>
        );
    });
}
