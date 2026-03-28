export default class RarityBadge {
    static getBadgeColor(rarete) {
        if (!rarete) return "secondary";
        switch (rarete.toLowerCase()) {
        case "mythique":
            return "primary";
        case "légendaire":
            return "warning";
        case "épique":
            return "info";
        case "rare":
            return "danger";
        default:
            return "secondary";
        }
    }
    static getHtml(rarete) {
        const color = this.getBadgeColor(rarete);
        const classes = "badge bg-" + color;
        let label = "";
        if (rarete && rarete.length > 0) {
        label = rarete;
        }
        return '<span class="' + classes + '" style="color: black;">' + label + '</span>';
    }
}
