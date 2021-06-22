import React, { ReactElement } from 'react';

import { useTrainingSettings } from '../../../hooks/useTrainingSettings';

export default function StatisticColumn(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();

  return (
    <div className="p-4 flex flex-col items-end">
      <div className="flex flex-row">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          checked={trainingSettings.isAutoWrite}
          onChange={(e) => {
            setTrainingSettings({
              ...trainingSettings,
              isAutoWrite: e.target.checked,
            });
          }}
        />
        <span className="text-sm">AutoWrite</span>
      </div>

      <table className="text-gray-500">
        <thead>
          <tr>
            <th style={{ minWidth: 48 }}></th>
            <th style={{ minWidth: 48 }}>avg</th>
            <th style={{ minWidth: 48 }}>last</th>
            <th style={{ minWidth: 48 }}>err</th>
            <th style={{ minWidth: 48 }}>x</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>k</td>
            <td>147</td>
            <td>147</td>
            <td>0</td>
            <td>36</td>
          </tr>
          <tr>
            <td>r</td>
            <td>147</td>
            <td>147</td>
            <td>0</td>
            <td>36</td>
          </tr>
          <tr>
            <td>s</td>
            <td>147</td>
            <td>147</td>
            <td>0</td>
            <td>36</td>
          </tr>
          <tr>
            <td>t</td>
            <td>147</td>
            <td>147</td>
            <td>0</td>
            <td>36</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
