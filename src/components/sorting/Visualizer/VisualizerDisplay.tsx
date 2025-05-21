import { useAppSelector } from '@/redux/hooks';
import BarUI from '@/components/sorting/BarUI';
import CellUI from '@/components/sorting/Cell/CellUI';
import { UIProps } from '@/types/sorting';


function VisualizerDisplay(props: UIProps) {
  const visualizerType = useAppSelector(
    (state) => state.sorting.visualizerType
  );

  if (visualizerType === 'cell') {
    return <CellUI {...props} />;
  }

  if (visualizerType === 'bar') {
    return <BarUI {...props} />;
  }

  return null;
}

export default VisualizerDisplay;
