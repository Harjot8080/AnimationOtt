import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Genre</th>
            <th className="widgetLgTh">No. of Movie</th>
            <th className="widgetLgTh">No. of Series</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">Action</span>
            </td>
            <td className="widgetLgMovies">1</td>
            <td className="widgetLgSeries">2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
